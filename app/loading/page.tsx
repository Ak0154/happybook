"use client";

import Link from 'next/link';

export default function LoadingPage() {
  return (
    <main className="page">
      <section className="card">
        <div className="spinner" />
        <h1>Building Your Learner Profile</h1>
        <p>Analyzing learning patterns...</p>
        <div className="progress">
          <div className="row">
            <span>Finalizing your profile</span>
            <strong>75%</strong>
          </div>
          <div className="bar"><span style={{ width: '75%' }} /></div>
        </div>
        <Link className="primary" href="/journey-ready">Continue →</Link>
      </section>

      <style jsx>{`
        .page { min-height: 100vh; background: linear-gradient(180deg, rgba(100,74,64,0.08), var(--surface)); display: grid; place-items: center; padding: 32px; }
        .card { width: min(420px, 100%); background: var(--card); border-radius: 20px; padding: 32px; text-align: center; box-shadow: var(--shadow); display: grid; gap: 16px; }
        .spinner { width: 96px; height: 96px; margin: 0 auto; border-radius: 50%; border: 8px solid rgba(100,74,64,0.15); border-top-color: var(--primary); animation: spin 1.6s linear infinite; }
        h1 { margin: 0; font-size: clamp(22px, 3vw, 26px); }
        p { margin: 0; color: var(--on-surface-variant); }
        .progress { text-align: left; display: grid; gap: 8px; margin-top: 8px; }
        .row { display: flex; justify-content: space-between; color: var(--on-surface-variant); font-weight: 600; }
        .bar { height: 10px; background: rgba(0,0,0,0.06); border-radius: 8px; overflow: hidden; }
        .bar span { display: block; height: 100%; background: var(--primary); }
        .primary { display: inline-block; margin-top: 12px; background: var(--primary); color: var(--on-primary); padding: 12px 16px; border-radius: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 12px 24px rgba(100,74,64,0.25); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
