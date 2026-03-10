"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { RadixAccordionDemo } from '@/components/demo/RadixAccordionDemo';
import { RadixProgressDemo } from '@/components/demo/RadixProgressDemo';

export default function WelcomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/signup?prompt=${encodeURIComponent(promptText.trim())}`);
    }, 2400); // Wait for the progress demo to fill up fully (1.6s algorithm + 0.5s css animation limit)
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <img
              src="/Logo.svg"
              alt="Happy Book Logo"
              width={88}
              height={88}
              style={{ marginLeft: '-16px' }}
            />
          </Link>
          <div className="nav-actions">
            <Link href="/login" className="nav-link">Log in</Link>
            <Link href="/signup" className="btn-nav-primary">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="blob-container">
          <div className="blob" />
          <div className="blob blob-2" />
        </div>

        <div className="hero-container">
          <div className="hero-content">


            <h1 className="title">
              Your academic <br className="hidden-desktop" />
              <span className="highlight">Superpower</span>
            </h1>

            <p className="subtitle">
              The AI-powered companion for last-minute academic support. <br className="hidden-mobile" />
              Conquer your coursework with confidence and ease.
            </p>

            <div className="actions">
              <Link href="/signup" className="btn-hero-primary flex flex-row items-center justify-center gap-2">
                Start learning
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>

            <p className="trust-text">Join thousands of students achieving better grades 🎓</p>
          </div>

          <div className="hero-visual-wrapper">
            <div className="hero-visual">
              <div className="mockup-header">
                <div className="dots">
                  <span className="dot close"></span>
                  <span className="dot minimize"></span>
                  <span className="dot expand"></span>
                </div>
              </div>
              <div className="mockup-body">
                {/* Mock Sidebar */}
                <div className="mock-sidebar">
                  <div className="mock-nav-item active"></div>
                  <div className="mock-nav-item"></div>
                  <div className="mock-nav-item"></div>
                  <div className="mock-nav-item mt-auto"></div>
                </div>

                {/* Main Content Area in Mockup */}
                <div className="mock-main">
                  {/* Floating Chat Bubbles */}
                  <div className="chat-bubble bubble-1">
                    <div className="bubble-avatar user-avatar">U</div>
                    <span className="bubble-text">"How do I solve quadratic equations?"</span>
                  </div>
                  <div className="chat-bubble bubble-2 ai-bubble">
                    <div className="bubble-avatar ai-avatar">✨</div>
                    <div className="bubble-content">
                      <span className="bubble-text">Here is a step-by-step breakdown...</span>
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line short"></div>
                    </div>
                  </div>
                  <div className="chat-bubble bubble-3">
                    <div className="bubble-avatar user-avatar">U</div>
                    <span className="bubble-text">"Can you summarize Chapter 4 Biology?"</span>
                  </div>

                  {/* Center Radar Logo */}
                  <div className="radar-container">
                    <div className="icon-wrapper">
                      <img src="/Logo.svg" alt="Happy Book Logo" width={110} height={110} className="circular-logo" />
                    </div>
                    <div className="pulsing-circles">
                      <div className="circle circle-1"></div>
                      <div className="circle circle-2"></div>
                      <div className="circle circle-3"></div>
                    </div>
                  </div>

                  {/* Mock Input Bar bottom */}
                  <div className="mock-input-container">
                    {!isSubmitting ? (
                      <form className="mock-input-bar" onSubmit={handlePromptSubmit}>
                        <input
                          type="text"
                          className="mock-input"
                          placeholder="Ask Happy Book anything..."
                          value={promptText}
                          onChange={(e) => setPromptText(e.target.value)}
                        />
                        <button type="submit" className="mock-send-btn" disabled={!promptText.trim()}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </form>
                    ) : (
                      <div className="w-full flex justify-center pb-4 cursor-default">
                        <RadixProgressDemo />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to succeed</h2>
            <p className="section-subtitle">Powerful features designed specifically to help you learn faster and retain more information.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="feature-title">AI Tutor</h3>
              <p className="feature-desc">Get instant answers to your complex questions with our advanced AI trained on academic materials.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="feature-title">Smart Scheduling</h3>
              <p className="feature-desc">Automatically organize your study sessions, assignments, and exams in one intuitive calendar.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Subject Management</h3>
              <p className="feature-desc">Keep all your course materials, notes, and deadlines perfectly organized by subject.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-24 mb-12">
        <div className="section-container flex flex-col items-center max-w-[800px] w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We've got answers.</p>
          </div>
          <RadixAccordionDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to boost your grades?</h2>
          <p className="cta-subtitle">Join thousands of students who have already transformed their academic journey.</p>
          <Link href="/login" className="btn-hero-primary cta-btn">
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/Logo.svg" alt="Happy Book Logo" width={28} height={28} />
              <span>Happy Book</span>
            </div>
            <div className="footer-links">
              <Link href="#" className="footer-link">Privacy Policy</Link>
              <Link href="#" className="footer-link">Terms of Service</Link>
              <Link href="#" className="footer-link">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Happy Book. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: var(--background);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(var(--surface-rgb), 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 24px -8px rgba(0,0,0,0.05);
        }

        .nav-container {
          width: 100%;
          max-width: 1200px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 20px;
          font-weight: 800;
          font-size: 22px;
          color: var(--on-surface);
          letter-spacing: -0.02em;
        }
        .logo svg {
          color: var(--primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-size: 15px;
          font-weight: 500;
          color: var(--on-surface-variant);
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .nav-link:hover {
          color: var(--on-surface);
        }

        .btn-nav-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 20px;
          border-radius: 100px;
          background: var(--on-surface);
          color: var(--surface);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-nav-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          opacity: 0.9;
        }
        .btn-nav-primary:active {
          transform: translateY(0);
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          padding: 160px 24px 80px 24px;
          display: flex;
          justify-content: center;
        }

        .blob-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .blob {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--primary) 0%, transparent 50%);
          opacity: 0.12;
          filter: blur(80px);
          animation: pulse 8s ease-in-out infinite alternate;
        }
        .blob-2 {
          top: 30%;
          left: 60%;
          background: radial-gradient(circle, var(--secondary) 0%, transparent 50%);
          animation-duration: 12s;
          opacity: 0.15;
          width: 600px;
          height: 600px;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 800px;
          width: 100%;
          animation: fadeUp 0.8s ease-out;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--card);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 100px;
          margin-bottom: 32px;
          font-size: 13px;
          font-weight: 600;
          color: var(--on-surface-variant);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .badge-icon {
          color: var(--primary);
        }

        .title {
          font-size: clamp(48px, 8vw, 84px);
          line-height: 1.05;
          font-weight: 800;
          color: var(--on-surface);
          margin: 0 0 24px 0;
          letter-spacing: -0.04em;
        }
        .title .highlight {
          color: var(--primary);
        }

        .subtitle {
          color: var(--on-surface-variant);
          font-size: clamp(18px, 2.5vw, 22px);
          line-height: 1.6;
          margin: 0 0 40px 0;
          max-width: 600px;
          font-weight: 400;
        }

        .actions {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 24px;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 0 36px;
          border-radius: 100px;
          background: var(--on-surface);
          color: var(--surface);
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.16);
          opacity: 0.95;
        }
        .btn-hero-primary:active {
          transform: translateY(0) scale(0.98);
        }

        .trust-text {
          font-size: 14px;
          color: var(--on-surface-variant);
          opacity: 0.8;
          font-weight: 500;
          margin-bottom: 64px;
        }

        .hero-visual-wrapper {
          width: 100%;
          max-width: 1000px;
          perspective: 1000px;
          animation: fadeUp 1s ease-out 0.2s both;
          margin-top: 80px; /* Pushed down significantly so it falls into view better */
        }

        .hero-visual {
          width: 100%;
          background: var(--card);
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 
            0 24px 80px -12px rgba(var(--shadow-color), 0.15),
            0 0 0 1px rgba(255,255,255,0.05) inset;
          overflow: hidden;
          transform: rotateX(4deg) scale(1);
          transform-origin: top center;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .hero-visual:hover {
          transform: rotateX(0deg) scale(1.01);
        }

        .mockup-header {
          height: 48px;
          background: var(--surface);
          border-bottom: 1px solid rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        .dots {
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .dot.close { background: #ff5f56; }
        .dot.minimize { background: #ffbd2e; }
        .dot.expand { background: #27c93f; }

        .mockup-body {
          height: 480px;
          background: var(--card);
          background-image: radial-gradient(rgba(128, 128, 128, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          position: relative;
          display: flex;
          overflow: hidden;
        }

        .mock-sidebar {
          width: 64px;
          height: 100%;
          background: rgba(0,0,0,0.02);
          border-right: 1px solid rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 0;
          gap: 16px;
          z-index: 5;
        }

        .mock-nav-item {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: rgba(0,0,0,0.04);
          transition: all 0.2s;
        }
        .mock-nav-item.active {
          background: rgba(var(--primary-rgb), 0.15);
          border: 1px solid rgba(var(--primary-rgb), 0.3);
        }
        .mt-auto { margin-top: auto; }

        .mock-main {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radar-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          animation: float 6s ease-in-out infinite;
          background: var(--surface);
          border-radius: 50%;
          padding: 8px;
          box-shadow: 
            0 20px 40px -10px rgba(var(--shadow-color), 0.2),
            0 0 0 1px rgba(var(--primary-rgb), 0.1) inset;
        }
        
        .circular-logo {
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .chat-bubble {
          position: absolute;
          z-index: 3;
          background: rgba(var(--surface-rgb), 0.85); /* Glassmorphism background */
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 18px;
          border-radius: 16px 16px 16px 4px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          box-shadow: 0 16px 32px -8px rgba(0,0,0,0.1);
          animation: float 6s ease-in-out infinite;
          max-width: 260px;
        }
        
        .chat-bubble.ai-bubble {
          border-radius: 16px 16px 4px 16px;
          background: rgba(var(--card-rgb), 0.9);
          border: 1px solid rgba(var(--primary-rgb), 0.2);
        }

        .bubble-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .user-avatar {
          background: var(--primary);
          color: var(--on-primary);
        }
        .ai-avatar {
          background: transparent;
          font-size: 16px;
        }

        .bubble-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .bubble-text {
          font-size: 13px;
          font-weight: 500;
          color: var(--on-surface);
          line-height: 1.4;
        }
        
        .skeleton-line {
          height: 6px;
          border-radius: 4px;
          background: rgba(0,0,0,0.06);
          width: 100%;
        }
        .skeleton-line.short {
          width: 60%;
        }

        .bubble-1 { top: 12%; left: 8%; animation-delay: 1.5s; }
        .bubble-2 { top: 40%; right: 4%; animation-delay: 3s; }
        .bubble-3 { bottom: 25%; left: 12%; animation-delay: 0.5s; }

        .mock-input-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, var(--card) 40%, transparent);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 24px;
          z-index: 10;
        }

        .mock-input-bar {
          width: 80%;
          max-width: 400px;
          height: 44px;
          background: var(--surface);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px 0 20px;
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.08);
        }

        .mock-input {
          flex: 1;
          font-size: 13px;
          color: var(--on-surface);
          background: transparent;
          border: none;
          outline: none;
        }
        .mock-input::placeholder {
          color: var(--on-surface-variant);
          opacity: 0.6;
        }

        .mock-send-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--on-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .mock-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pulsing-circles {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--primary);
          opacity: 0;
        }
        .circle-1 {
          width: 220px;
          height: 220px;
          animation: ripple 4.5s linear infinite;
        }
        .circle-2 {
          width: 220px;
          height: 220px;
          animation: ripple 4.5s linear infinite 1.5s;
        }
        .circle-3 {
          width: 220px;
          height: 220px;
          animation: ripple 4.5s linear infinite 3s;
        }

        /* Features Section */
        .features-section {
          padding: 120px 24px;
          background: var(--surface);
          border-top: 1px solid rgba(0,0,0,0.02);
          display: flex;
          justify-content: center;
        }
        .section-container {
          width: 100%;
          max-width: 1200px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .section-title {
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 800;
          color: var(--on-surface);
          margin: 0 0 16px 0;
          letter-spacing: -0.03em;
        }
        .section-subtitle {
          font-size: 18px;
          color: var(--on-surface-variant);
          line-height: 1.6;
          margin: 0;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }
        
        .feature-card {
          background: var(--card);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.08);
        }
        
        .feature-icon {
          width: 48px;
          height: 48px;
          background: rgba(var(--primary-rgb), 0.1);
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .feature-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--on-surface);
          margin: 0 0 12px 0;
        }
        
        .feature-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--on-surface-variant);
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 24px;
          background: var(--card);
          border-top: 1px solid rgba(0,0,0,0.03);
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .cta-container {
          max-width: 600px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-title {
          font-size: clamp(32px, 4vw, 40px);
          font-weight: 800;
          color: var(--on-surface);
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }
        .cta-subtitle {
          font-size: 18px;
          color: var(--on-surface-variant);
          margin: 0 0 40px 0;
          line-height: 1.5;
        }
        .cta-btn {
          min-width: 240px;
        }

        /* Footer */
        .footer {
          background: var(--surface);
          border-top: 1px solid rgba(0,0,0,0.04);
          padding: 60px 24px 40px 24px;
          display: flex;
          justify-content: center;
        }
        .footer-container {
          width: 100%;
          max-width: 1200px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 18px;
          color: var(--on-surface);
        }
        .footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--on-surface);
        }
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          justify-content: center;
          font-size: 14px;
          color: var(--on-surface-variant);
        }

        /* Animations */
        @keyframes pulse {
          0% { opacity: 0.12; transform: translateX(-50%) scale(1); }
          100% { opacity: 0.18; transform: translateX(-50%) scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes ripple {
          0% { width: 120px; height: 120px; opacity: 0.4; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 767px) {
          .hidden-mobile { display: none; }
          .title { font-size: 40px; }
          .nav-actions .btn-nav-primary { display: none; } /* Simplify nav on mobile */
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (min-width: 768px) {
          .hidden-desktop { display: none; }
        }
      `}</style>
    </div>
  );
}
