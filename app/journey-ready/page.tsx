"use client";
export default function JourneyReadyPage() {
  return (
    <main className="page">
      <section className="card">
        <div className="illustration" />
        <h1>Your Personalized Journey Is Ready!</h1>
        <p>We have crafted a unique learning path just for you, powered by AI to help you stay ahead.</p>
        <div className="actions">
          <button className="primary">Begin My Journey</button>
          <button className="ghost">Preview My Plan</button>
        </div>
      </section>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); display: grid; place-items: center; padding: 32px; }
        .card { width: min(520px, 100%); background: var(--card); border-radius: 24px; padding: 32px; text-align: center; box-shadow: var(--shadow); display: grid; gap: 16px; }
        .illustration { aspect-ratio: 1; width: 100%; border-radius: 24px; background: linear-gradient(135deg, var(--secondary), rgba(100,74,64,0.18)); }
        h1 { margin: 0; font-size: clamp(26px, 4vw, 32px); }
        p { margin: 0; color: var(--on-surface-variant); line-height: 1.5; }
        .actions { display: grid; gap: 12px; }
        .primary { background: var(--primary); color: var(--on-primary); border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 12px 24px rgba(100,74,64,0.25); }
        .ghost { background: transparent; color: var(--on-surface-variant); border: none; padding: 10px; font-weight: 700; text-decoration: underline; cursor: pointer; }
      `}</style>
    </main>
  );
}
