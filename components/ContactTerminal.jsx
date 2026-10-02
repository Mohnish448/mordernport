'use client';

import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Radio, Lock, Mail, Copy, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

const RECIPIENT_EMAIL = 'mohnishkumar724@gmail.com';

export default function ContactTerminal() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | transmitting | sent | error
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RECIPIENT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;

    setStatus('transmitting');
    setErrorMessage('');

    try {
      // 1. Try our internal Next.js API route first
      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      // 2. Fallback directly to FormSubmit if internal route encountered an issue
      if (!response.ok) {
        response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: form.name || 'Anonymous Explorer',
            email: form.email,
            message: form.message,
            _subject: `[Portfolio Dispatch] Incoming transmission from ${form.name || form.email}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
        }, 6000);
      } else {
        throw new Error(data.error || data.message || 'Signal transmission failed.');
      }
    } catch (err) {
      console.error('Dispatch error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Transmission encountered packet loss.');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/30 text-sky-300 font-mono text-xs mb-4">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>DIRECT LINK // ENCRYPTED PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            INITIATE <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-white">TRANSMISSION</span>
          </h2>
          <p className="mt-3 font-mono text-sm text-neutral-300 max-w-lg mx-auto">
            Ready to build futuristic digital experiences? Send an encrypted dispatch or reach out directly to my inbox.
          </p>

          {/* Quick Direct Mail Access Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-xl bg-neutral-950/80 border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-sky-300">
              <Mail className="w-4 h-4 text-sky-400" />
              <span className="font-semibold text-white tracking-wide">{RECIPIENT_EMAIL}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-500/30 text-sky-200 text-xs font-mono transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span>COPY</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${RECIPIENT_EMAIL}?subject=Portfolio%20Inquiry%20from%20Website`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                title="Send direct email"
              >
                <span>OPEN MAIL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-500/30 text-sky-200 hover:text-white text-xs font-mono transition-all cursor-pointer"
                title="Connect on LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="relative rounded-2xl bg-black/80 backdrop-blur-xl border border-sky-500/20 shadow-[0_0_40px_rgba(2,132,199,0.15)] overflow-hidden pointer-events-auto">
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/90 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>COMMS_SHELL v1.4.2 // TARGET: {RECIPIENT_EMAIL}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-sky-400">
              <Lock className="w-3 h-3" />
              <span>TLS 1.3 SECURE</span>
            </div>
          </div>

          {/* Terminal Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-sky-300 mb-2">
                  CALLSIGN / NAME <span className="text-sky-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'transmitting'}
                  placeholder="e.g. Commander Sarah"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950/90 border border-neutral-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white font-mono text-sm placeholder:text-neutral-600 outline-none transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-sky-300 mb-2">
                  FREQUENCY / YOUR EMAIL <span className="text-sky-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={status === 'transmitting'}
                  placeholder="commander@network.io"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950/90 border border-neutral-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white font-mono text-sm placeholder:text-neutral-600 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-sky-300 mb-2">
                TRANSMISSION PAYLOAD <span className="text-sky-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                disabled={status === 'transmitting'}
                placeholder="Describe project scope, mission parameters, or timeline..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-neutral-950/90 border border-neutral-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white font-mono text-sm placeholder:text-neutral-600 outline-none transition-all resize-none disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="font-mono text-xs text-neutral-400">
                {status === 'idle' && (
                  <span>DISPATCH TARGET: <span className="text-sky-300">{RECIPIENT_EMAIL}</span></span>
                )}
                {status === 'transmitting' && (
                  <span className="text-sky-400 flex items-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                    <span>ENCRYPTING &amp; DISPATCHING TO INBOX...</span>
                  </span>
                )}
                {status === 'sent' && (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>TRANSMISSION DELIVERED TO MOHNISH // ACK RECEIVED</span>
                  </span>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage || 'Dispatch failed.'}</span>
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}?subject=Portfolio%20Direct%20Transmission&body=${encodeURIComponent(form.message || '')}`}
                      className="underline hover:text-white ml-1 text-xs"
                    >
                      Email directly
                    </a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {status === 'transmitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>DISPATCH SIGNAL</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>
    </section>
  );
}
