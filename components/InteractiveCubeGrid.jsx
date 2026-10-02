'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export default function InteractiveCubeGrid({ 
  onMatrixStats,
  interactiveMode = 'wave',
  colorTheme = 'sky' 
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    mouse: new THREE.Vector2(-9999, -9999),
    targetMouse: new THREE.Vector2(-9999, -9999),
    isHovering: false,
    ripples: [],
    boxes: [],
    cameraTargetY: 34,
    cameraAngle: 0.35,
  });

  const [stats, setStats] = useState({ activeCubes: 0, fps: 60 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020408);
    scene.fog = new THREE.FogExp2(0x020408, 0.016);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);

    const updateCameraForViewport = (w, h) => {
      const aspect = w / h;
      camera.aspect = aspect;
      if (aspect < 0.9) {
        // Mobile portrait: increase FOV and elevate camera so full matrix is visible
        camera.fov = Math.min(65, 42 / Math.max(0.55, aspect));
        camera.position.set(0, 44, 52);
      } else if (aspect < 1.2) {
        // Tablet / square viewport
        camera.fov = 48;
        camera.position.set(0, 38, 46);
      } else {
        // Desktop widescreen
        camera.fov = 42;
        camera.position.set(0, 36, 42);
      }
      camera.lookAt(0, -1, 0);
      camera.updateProjectionMatrix();
    };

    updateCameraForViewport(width, height);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    // Ambient light kept subtle for futuristic contrast
    const ambientLight = new THREE.AmbientLight(0x0b1e33, 1.2);
    scene.add(ambientLight);

    // Main sky blue directional key light
    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(20, 40, 20);
    scene.add(dirLight1);

    // Cyan/White fill light from opposite angle
    const dirLight2 = new THREE.DirectionalLight(0xe0f2fe, 1.8);
    dirLight2.position.set(-25, 25, -20);
    scene.add(dirLight2);

    // Cyan point light following the mouse area
    const mouseLight = new THREE.PointLight(0x38bdf8, 0, 25);
    mouseLight.position.set(0, 6, 0);
    scene.add(mouseLight);

    // --- Ground Grid & Sub-plane ---
    const gridHelper = new THREE.GridHelper(90, 45, 0x1e3a5f, 0x0a1626);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // --- Cube Matrix Setup ---
    // Grid dimensions
    const cols = 26;
    const rows = 16;
    const boxSize = 2.1;
    const boxHeight = 4.2;
    const gap = 0.42;
    const step = boxSize + gap;

    const offsetX = ((cols - 1) * step) / 2;
    const offsetZ = ((rows - 1) * step) / 2;

    const boxGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);

    // Top face material: STRICTLY PITCH BLACK
    // In BoxGeometry, faces order: +X (0), -X (1), +Y (top: 2), -Y (bottom: 3), +Z (4), -Z (5)
    const matTop = new THREE.MeshStandardMaterial({
      color: 0x010204, // Deepest black
      roughness: 0.95,
      metalness: 0.1,
    });

    const matBottom = new THREE.MeshBasicMaterial({ color: 0x000000 });

    // Rest side color (dark cyber navy)
    const restColor = new THREE.Color(0x041322);
    const restEmissive = new THREE.Color(0x010912);

    // Active side colors: Sky Blue and Crisp White
    const activeSkyColor = new THREE.Color(0x38bdf8); // vibrant sky blue
    const activeWhiteColor = new THREE.Color(0xf0f9ff); // crisp white tint
    const activeEmissive = new THREE.Color(0x0284c7); // emissive cyan glow

    const boxes = [];
    const group = new THREE.Group();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const posX = c * step - offsetX;
        const posZ = r * step - offsetZ;

        // Clone side material for each box so sides can smoothly glow independently
        const matSides = new THREE.MeshStandardMaterial({
          color: restColor.clone(),
          emissive: restEmissive.clone(),
          emissiveIntensity: 0.2,
          roughness: 0.25,
          metalness: 0.85,
        });

        // Materials array: [right, left, TOP, bottom, front, back]
        const materials = [
          matSides, // +x (right side)
          matSides, // -x (left side)
          matTop,   // +y (TOP FACE: ALWAYS BLACK)
          matBottom,// -y (bottom)
          matSides, // +z (front side)
          matSides, // -z (back side)
        ];

        const mesh = new THREE.Mesh(boxGeo, materials);
        // Position cube so at rest (y = -boxHeight/2 + 0.05), top face is flush with ground
        const restY = -boxHeight / 2 + 0.05;
        mesh.position.set(posX, restY, posZ);

        group.add(mesh);

        boxes.push({
          mesh,
          matSides,
          baseX: posX,
          baseZ: posZ,
          restY: restY,
          currentElevation: 0,
          targetElevation: 0,
          glowFactor: 0,
          targetGlow: 0,
        });
      }
    }

    scene.add(group);
    stateRef.current.boxes = boxes;

    // --- Floating Cyber Dust / Particles ---
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = Math.random() * 25 + 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 60;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.35,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Raycasting Math Plane ---
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();

    // Track mouse coordinates
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      stateRef.current.targetMouse.set(x, y);
      stateRef.current.isHovering = true;
    };

    const handlePointerLeave = () => {
      stateRef.current.isHovering = false;
      stateRef.current.targetMouse.set(-9999, -9999);
    };

    const handlePointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const hit = raycaster.ray.intersectPlane(groundPlane, hitPoint);
      if (hit) {
        stateRef.current.ripples.push({
          x: hitPoint.x,
          z: hitPoint.z,
          radius: 0,
          maxRadius: 48,
          speed: 16,
          strength: 4.2,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      updateCameraForViewport(w, h);
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCounter = 0;
    let lastFpsUpdate = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      stateRef.current.mouse.lerp(stateRef.current.targetMouse, 0.15);

      // Raycast to ground plane
      let worldMouseX = -9999;
      let worldMouseZ = -9999;
      if (stateRef.current.isHovering || stateRef.current.mouse.x > -9000) {
        raycaster.setFromCamera(stateRef.current.mouse, camera);
        if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
          worldMouseX = hitPoint.x;
          worldMouseZ = hitPoint.z;
          mouseLight.position.set(hitPoint.x, 5.5, hitPoint.z);
          mouseLight.intensity = 3.5;
        } else {
          mouseLight.intensity = THREE.MathUtils.lerp(mouseLight.intensity, 0, 0.1);
        }
      } else {
        mouseLight.intensity = THREE.MathUtils.lerp(mouseLight.intensity, 0, 0.1);
      }

      // Update ripples
      const activeRipples = stateRef.current.ripples;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const ripple = activeRipples[i];
        ripple.radius += ripple.speed * delta;
        ripple.strength *= 0.96;
        if (ripple.radius >= ripple.maxRadius || ripple.strength < 0.05) {
          activeRipples.splice(i, 1);
        }
      }

      // Camera subtle breathing / gentle parallax
      const targetCamX = (stateRef.current.mouse.x > -9000 ? stateRef.current.mouse.x * 3.5 : 0);
      const targetCamZ = 42 + (stateRef.current.mouse.y > -9000 ? -stateRef.current.mouse.y * 2.0 : 0);
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.lookAt(0, -0.5, 0);

      // Particles gentle drift
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += delta * 0.4;
        if (positions[i] > 26) positions[i] = 1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update Boxes
      let activeCount = 0;
      const hoverRadius = 8.5; // Radius of mouse pop-up wave
      const maxPopElevation = 3.6; // How high the box pops up

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];

        // 1. Proximity to cursor
        let proximityInfluence = 0;
        if (worldMouseX > -9000) {
          const dist = Math.hypot(b.baseX - worldMouseX, b.baseZ - worldMouseZ);
          if (dist < hoverRadius) {
            // Smooth bell curve / cosine easing
            const norm = dist / hoverRadius;
            proximityInfluence = Math.cos(norm * (Math.PI / 2));
            proximityInfluence = Math.pow(proximityInfluence, 1.4); // sharper peak
          }
        }

        // 2. Ripple wave influence
        let rippleInfluence = 0;
        for (let r = 0; r < activeRipples.length; r++) {
          const rip = activeRipples[r];
          const ripDist = Math.hypot(b.baseX - rip.x, b.baseZ - rip.z);
          const diff = Math.abs(ripDist - rip.radius);
          if (diff < 3.2) {
            const waveVal = Math.cos((diff / 3.2) * (Math.PI / 2));
            rippleInfluence += waveVal * rip.strength;
          }
        }

        // 3. Subtle ambient cyber pulse across grid
        const ambientWave = Math.sin(time * 1.5 + (b.baseX * 0.15) + (b.baseZ * 0.15)) * 0.12;

        // Combined target elevation
        b.targetElevation = (proximityInfluence * maxPopElevation) + rippleInfluence + Math.max(0, ambientWave);
        b.targetGlow = Math.min(1.0, proximityInfluence * 1.2 + (rippleInfluence * 0.8));

        // Smooth spring physics / lerp
        b.currentElevation += (b.targetElevation - b.currentElevation) * 0.14;
        b.glowFactor += (b.targetGlow - b.glowFactor) * 0.14;

        if (b.currentElevation > 0.15) activeCount++;

        // Update mesh Y position: top face stays at (restY + boxHeight/2 + currentElevation)
        b.mesh.position.y = b.restY + b.currentElevation;

        // --- DYNAMIC SIDE COLOR TRANSITION (Sky Blue & White) ---
        // Top face remains 100% pitch black.
        // Side faces transition smoothly from deep dark cyber navy to vibrant sky blue / neon white!
        if (b.glowFactor > 0.005) {
          // Color blends from restColor -> activeSkyColor -> activeWhiteColor on peak
          const t = Math.min(1, b.glowFactor);
          
          if (t < 0.65) {
            // Transition from dark navy to vibrant Sky Blue
            const subT = t / 0.65;
            b.matSides.color.lerpColors(restColor, activeSkyColor, subT);
            b.matSides.emissive.lerpColors(restEmissive, activeEmissive, subT);
            b.matSides.emissiveIntensity = 0.2 + subT * 1.1;
          } else {
            // Peak glow transitions into Sky Blue with White edge luminescence
            const subT = (t - 0.65) / 0.35;
            b.matSides.color.lerpColors(activeSkyColor, activeWhiteColor, subT * 0.85);
            b.matSides.emissive.lerpColors(activeEmissive, activeWhiteColor, subT * 0.5);
            b.matSides.emissiveIntensity = 1.3 + subT * 1.4;
          }
        } else {
          b.matSides.color.copy(restColor);
          b.matSides.emissive.copy(restEmissive);
          b.matSides.emissiveIntensity = 0.2;
        }
      }

      // Stats update (throttle to ~3 times per second)
      frameCounter++;
      if (time - lastFpsUpdate > 0.35) {
        setStats({
          activeCubes: activeCount,
          fps: Math.round(frameCounter / (time - lastFpsUpdate)),
        });
        if (onMatrixStats) {
          onMatrixStats({ activeCubes: activeCount, totalCubes: boxes.length });
        }
        frameCounter = 0;
        lastFpsUpdate = time;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      boxGeo.dispose();
      matTop.dispose();
      matBottom.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      boxes.forEach((b) => b.matSides.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onMatrixStats, interactiveMode, colorTheme]);

  // Trigger pulse wave on demand
  const triggerPulse = useCallback(() => {
    stateRef.current.ripples.push({
      x: 0,
      z: 0,
      radius: 0,
      maxRadius: 55,
      speed: 20,
      strength: 4.8,
    });
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-auto select-none bg-black"
      style={{ touchAction: 'pan-y' }}
    >
      {/* ThreeJS WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-crosshair" 
        style={{ touchAction: 'pan-y' }}
      />

      {/* Cyber Vignette & Subtle Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,8,0.7)_70%,rgba(0,0,0,0.95)_100%)]" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
}
