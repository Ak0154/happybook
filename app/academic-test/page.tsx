"use client";

import Link from 'next/link';

const options = ['mgh', '1/2 mv²', 'F = ma', 'E = mc²'];

export default function AcademicTestPage() {
  return (
    <main className="page">
      <header className="top">
        <Link href="/language" className="ghost">×</Link>
        <div className="title">Physics Test</div>
        <div style={{ width: 32 }} />
      </header>

      <section className="body">
        <div className="progress">
          <div className="meta">Question 3/10</div>
          <div className="pill">
            <span>⏱️ 14:35</span>
          </div>
        </div>
        <div className="bar"><span style={{ width: '30%' }} /></div>

        <article className="card">
          <h1>What is the formula for calculating kinetic energy?</h1>
          <p>Select the correct option from the choices below.</p>
          <div className="options">
            {options.map((opt) => (
              <button key={opt} className="option">
                <span className="radio" />
                <span className="label">{opt}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <footer className="footer">
        <button className="ghost">← Back</button>
        <Link href="/psychological-test" className="primary">Next Question →</Link>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .top { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; }
        .ghost { background: var(--card); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(0,0,0,0.08); text-decoration: none; color: var(--on-surface); font-weight: 700; }
        .title { font-weight: 700; }
        .body { padding: 0 24px 24px; display: grid; gap: 16px; }
        .progress { display: flex; justify-content: space-between; align-items: center; }
        .meta { color: var(--on-surface-variant); font-weight: 600; }
        .pill { background: var(--secondary); color: var(--on-secondary); padding: 8px 12px; border-radius: 999px; font-weight: 700; }
        .bar { height: 10px; background: var(--secondary); border-radius: 8px; overflow: hidden; }
        .bar span { display: block; height: 100%; background: var(--primary); }
        .card { background: var(--card); border-radius: 20px; padding: 24px; box-shadow: var(--shadow); display: grid; gap: 12px; }
        .card h1 { margin: 0; font-size: clamp(24px, 3vw, 28px); line-height: 1.3; }
        .card p { margin: 0; color: var(--on-surface-variant); }
        .options { display: grid; gap: 12px; margin-top: 8px; }
        .option { width: 100%; text-align: left; padding: 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; cursor: pointer; }
        .option:hover { border-color: rgba(100,74,64,0.4); box-shadow: 0 8px 18px rgba(0,0,0,0.08); }
        .radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.2); }
        .label { font-weight: 600; }
        .footer { margin-top: auto; padding: 20px 24px 32px; display: flex; gap: 12px; justify-content: space-between; }
        .footer .primary { flex: 1; text-align: center; background: var(--primary); color: var(--on-primary); padding: 14px; border-radius: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 12px 24px rgba(100,74,64,0.25); }
        .footer .ghost { width: 120px; background: var(--secondary); color: var(--on-secondary); border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        @media (max-width: 768px) { .body { padding: 0 16px 16px; } .top { padding: 12px 16px; } .footer { flex-direction: column; } .footer .ghost { width: 100%; } }
      `}</style>
    </main>
  );
}
