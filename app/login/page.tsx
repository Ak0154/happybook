"use client";

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="shell">
      <header className="header">
        <div className="logo">🎓</div>
        <div>
          <div className="eyebrow">Conquer Your Coursework</div>
          <h1>Last-minute academic support.</h1>
        </div>
      </header>

      <section className="card">
        <div className="segmented">
          <button className="active">Login</button>
          <button>Sign Up</button>
        </div>

        <label className="field">
          <span>Email</span>
          <input type="email" placeholder="Enter your email" />
        </label>

        <label className="field">
          <span>Password</span>
          <input type="password" placeholder="Enter your password" />
          <a className="link">Forgot Password?</a>
        </label>

        <button className="primary">Log In</button>

        <div className="divider"><span>or</span></div>

        <button className="outlined">Continue with Google</button>
        <button className="outlined">Continue with Apple</button>

        <p className="tos">
          By continuing, you agree to our <a className="link">Terms of Service</a>.
        </p>

        <div className="footer-links">
          <Link href="/language" className="link">Continue to language selection →</Link>
        </div>
      </section>

      <style jsx>{`
        .shell { min-height: 100vh; background: var(--surface); display: grid; place-items: center; padding: 48px; }
        .header { text-align: center; margin-bottom: 24px; color: var(--on-surface); }
        .logo { width: 64px; height: 64px; display: grid; place-items: center; background: rgba(100,74,64,0.15); border-radius: 16px; margin: 0 auto 12px; font-size: 28px; }
        .eyebrow { color: var(--on-surface-variant); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; }
        h1 { margin: 6px 0 0; font-size: clamp(24px, 3vw, 32px); }
        .card { width: min(480px, 100%); background: var(--card); border-radius: 16px; box-shadow: var(--shadow); padding: 28px; display: grid; gap: 16px; }
        .segmented { display: grid; grid-template-columns: 1fr 1fr; background: var(--secondary); padding: 4px; border-radius: 8px; }
        .segmented button { border: none; background: transparent; padding: 10px; font-weight: 600; border-radius: 6px; cursor: pointer; color: var(--on-surface-variant); }
        .segmented .active { background: var(--card); color: var(--on-surface); box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
        .field { display: grid; gap: 6px; font-weight: 600; color: var(--on-surface); }
        .field input { padding: 14px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.08); background: var(--surface); font-size: 15px; }
        .field input:focus { outline: 2px solid rgba(100,74,64,0.35); border-color: transparent; }
        .link { color: var(--primary); font-weight: 600; cursor: pointer; text-decoration: underline; font-size: 14px; }
        .primary { background: var(--primary); color: var(--on-primary); border: none; padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 20px rgba(100,74,64,0.25); }
        .outlined { background: transparent; color: var(--on-surface); border: 1px solid rgba(0,0,0,0.08); padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .divider { position: relative; text-align: center; color: var(--on-surface-variant); font-weight: 600; font-size: 14px; }
        .divider span { background: var(--card); padding: 0 10px; position: relative; z-index: 1; }
        .divider::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(0,0,0,0.08); }
        .tos { margin: 0; color: var(--on-surface-variant); font-size: 12px; text-align: center; }
        .footer-links { text-align: center; margin-top: 4px; }
        @media (max-width: 768px) { .shell { padding: 24px; } .card { padding: 22px; } }
      `}</style>
    </main>
  );
}
