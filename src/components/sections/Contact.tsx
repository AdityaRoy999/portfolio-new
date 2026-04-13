'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import HoverSplitText from '@/components/ui/HoverSplitText';

/* Inline brand SVGs — Lucide doesn't include brand icons */
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const SOCIALS = [
  { icon: GitHubIcon, href: 'https://github.com/AdityaRoy999', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/aditya-roy-0492ab26b/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/ANONYMOUS43580', label: 'X' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const email = 'aditya.roy9395525@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id] && value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('There was an issue sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-spacing relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(232, 255, 71, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-main relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column - Contact Details */}
        <div>
          <p className="text-label mb-6">Get In Touch</p>

          {/* Giant headline */}
          <div className="mb-16">
            <HoverSplitText
              text="Let's Talk"
              className="text-h2 lg:text-h1 font-display text-text-primary"
              defaultColor="text-text-primary"
              hoverColor="text-text-primary"
            />
          </div>

          {/* Email */}
          <div className="mb-16">
            <p className="text-label mb-4">Say hello at</p>
            <button
              onClick={copyEmail}
              className="group flex items-center gap-4 text-xl sm:text-2xl md:text-4xl font-display text-text-primary hover:text-accent transition-colors duration-300"
              data-cursor="link"
              data-cursor-label={copied ? 'Copied!' : 'Copy'}
            >
              <Mail size={24} className="text-accent shrink-0" />
              <span className="link-underline break-all">{email}</span>
              {copied ? (
                <Check size={20} className="text-green-400 shrink-0" />
              ) : (
                <Copy size={20} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text-muted shrink-0" />
              )}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mb-16">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-bg hover:bg-accent transition-all duration-300"
                data-cursor="pill"
                data-cursor-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
            </span>
            <span className="text-sm font-mono text-text-secondary">
              Open to new opportunities
            </span>
          </div>
        </div>

        {/* Right Column - Minimal Form */}
        <div className="flex flex-col lg:items-end w-full">
          <form 
            className="w-full max-w-lg glass rounded-2xl p-8 md:p-12 flex flex-col gap-8" 
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col relative group">
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="What's your name?" 
                className={`bg-transparent border-b py-4 text-text-primary placeholder:text-text-muted focus:outline-none transition-colors duration-300 ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'}`} 
              />
              <div className={`overflow-hidden transition-all duration-300 ${errors.name ? 'max-h-10 mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                <span className="text-xs text-red-500 font-mono tracking-wider">* PLEASE FILL OUT THIS FIELD</span>
              </div>
            </div>

            <div className="flex flex-col relative group">
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="What's your email?" 
                className={`bg-transparent border-b py-4 text-text-primary placeholder:text-text-muted focus:outline-none transition-colors duration-300 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'}`} 
              />
              <div className={`overflow-hidden transition-all duration-300 ${errors.email ? 'max-h-10 mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                <span className="text-xs text-red-500 font-mono tracking-wider">* A VALID EMAIL IS REQUIRED</span>
              </div>
            </div>

            <div className="flex flex-col relative group">
              <textarea 
                id="message" 
                value={formData.message}
                onChange={handleInputChange}
                rows={4} 
                placeholder="Your message..." 
                className={`bg-transparent border-b py-4 text-text-primary placeholder:text-text-muted focus:outline-none transition-colors duration-300 resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'}`} 
              />
              <div className={`overflow-hidden transition-all duration-300 ${errors.message ? 'max-h-10 mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                <span className="text-xs text-red-500 font-mono tracking-wider">* MESSAGE CANNOT BE EMPTY</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`group flex items-center justify-between w-full mt-4 pb-4 border-b border-text-primary text-text-primary transition-all duration-300 text-left font-display text-xl ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:text-accent hover:border-accent'
              }`}
              data-cursor="link"
            >
              <span>{isSubmitting ? 'Sending...' : success ? 'Message Sent!' : 'Send Message'}</span>
              <span className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                success ? 'border-green-500 text-green-500' : 'border-border group-hover:border-accent'
              }`}>
                {success ? (
                  <Check size={18} />
                ) : (
                  <ArrowUpRight
                    size={18}
                    className={`transition-transform duration-300 ${isSubmitting ? '' : 'group-hover:rotate-45'}`}
                  />
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
