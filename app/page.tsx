"use client";

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="welcome">
      <div className="blob" />

      <div className="spacer" />

      <div className="center-content">
        <div className="icon-card">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        <h1 className="title">
          Welcome to <br />
          Happy Book
        </h1>

        <p className="subtitle">Last-minute academic support.</p>
      </div>

      <div className="spacer" />

      <div className="actions">
        <Link href="/login" className="btn primary">Get Started</Link>
        <Link href="/login" className="btn ghost">I already have an account</Link>
      </div>

      <style jsx>{`
        .welcome {
          min-height: 100vh;
          background: var(--surface);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
          overflow: hidden;
        }
        .blob {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 384px;
          background: radial-gradient(circle at center top, var(--primary) 0%, transparent 100%);
          opacity: 0.3;
          z-index: 0;
        }
        .spacer {
          flex: 1;
        }
        .center-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 480px;
        }
        .icon-card {
          margin-bottom: 32px;
          width: 112px;
          height: 112px;
          background: var(--card);
          border-radius: 24px;
          display: grid;
          place-items: center;
          color: var(--primary);
          box-shadow: 0 10px 15px -3px rgba(var(--shadow-color), 0.1);
        }
        .title {
          text-align: center;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 700;
          color: var(--on-surface);
          margin: 0 0 16px 0;
          letter-spacing: -0.025em;
        }
        .subtitle {
          text-align: center;
          color: var(--on-surface-variant);
          font-size: 18px;
          margin: 0;
          line-height: 1.625;
        }
        .actions {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          display: grid;
          gap: 16px;
          margin-top: 64px;
          margin-bottom: 16px;
        }
        .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: 56px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 18px;
          text-decoration: none;
          transition: transform 0.1s;
          cursor: pointer;
        }
        .btn:active { transform: scale(0.98); }
        .btn.primary {
          background: var(--primary);
          color: var(--on-primary);
          box-shadow: 0 4px 6px rgba(100,74,64,0.3);
        }
        .btn.ghost {
          background: transparent;
          color: var(--on-surface-variant);
          font-size: 14px;
          font-weight: 500;
          height: auto;
          padding: 8px;
        }
      `}</style>
    </main>
  );
}
