"use client";

import Link from 'next/link';

const options = [
  'Dive in and try to figure it out on my own.',
  'Look for a video tutorial first.',
  'Read articles and documentation.',
  'Ask a friend or mentor for help.'
];

export default function PsychologicalTestPage() {
  return (
    <main className="page">
      <header className="top">
        <Link href="/academic-test" className="ghost">×</Link>
        <div className="progress">
          <div className="bar"><span style={{ width: '30%' }} /></div>
          <div className="pill">3/10</div>
        </div>
      </header>

      <section className="body">
        <div className="icon">🧠</div>
        <div className="eyebrow">Question 3 of 10</div>
        <h1>When faced with a difficult new topic, you are most likely to...</h1>
        <div className="options">
          {options.map((opt) => (
            <button key={opt} className="option">
              <span className="radio" />
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <Link href="/loading" className="primary">Continue →</Link>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .top { display: flex; align-items: center; gap: 12px; padding: 16px 24px; }
        .ghost { background: var(--card); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(0,0,0,0.08); text-decoration: none; color: var(--on-surface); font-weight: 700; }
        .progress { display: flex; align-items: center; gap: 12px; flex: 1; }
        .bar { flex: 1; height: 10px; background: var(--secondary); border-radius: 8px; overflow: hidden; }
        .bar span { display: block; height: 100%; background: var(--primary); }
        .pill { background: var(--primary); color: var(--on-primary); padding: 10px 14px; border-radius: 999px; font-weight: 700; }
        .body { padding: 0 24px 24px; display: grid; gap: 14px; text-align: center; }
        .icon { width: 96px; height: 96px; border-radius: 50%; background: rgba(100,74,64,0.1); display: grid; place-items: center; font-size: 40px; justify-self: center; }
        .eyebrow { color: var(--primary); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; }
        h1 { margin: 0; font-size: clamp(24px, 3vw, 30px); }
        .options { display: grid; gap: 12px; }
        .option { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; padding: 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); cursor: pointer; text-align: left; }
        .option:hover { border-color: rgba(100,74,64,0.4); box-shadow: 0 8px 18px rgba(0,0,0,0.08); }
        .radio { width: 22px; height: 22px; border: 2px solid rgba(0,0,0,0.25); border-radius: 50%; }
        .footer { margin-top: auto; padding: 20px 24px 32px; }
        .primary { display: inline-block; background: var(--primary); color: var(--on-primary); padding: 14px 18px; border-radius: 14px; font-weight: 700; text-align: center; width: 100%; max-width: 320px; box-shadow: 0 12px 24px rgba(100,74,64,0.25); text-decoration: none; }
        @media (max-width: 768px) { .body { padding: 0 16px 16px; } .top { padding: 12px 16px; } }
      `}</style>
    </main>
  );
}
