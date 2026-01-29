"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: "What is the formula for calculating kinetic energy?",
    options: ["mgh", "1/2 mv²", "F = ma", "E = mc²"],
    answer: "1/2 mv²"
  },
  {
    id: 2,
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    answer: "Albert Einstein"
  },
  {
    id: 3,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    answer: "Mitochondria"
  }
];

export default function AcademicTestPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progress = ((currentQ + 1) / questions.length) * 100;
  const question = questions[currentQ];

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
    } else {
      router.push('/psychological-test');
    }
  };

  return (
    <main className="page">
      <header className="top">
        <Link href="/language" className="ghost">×</Link>
        <div className="title">Academic Assessment</div>
        <div style={{ width: 32 }} />
      </header>

      <section className="body">
        <div className="progress">
          <div className="meta">Question {currentQ + 1}/{questions.length}</div>
          <div className="pill">
            <span>⏱️ 14:35</span>
          </div>
        </div>
        <div className="bar"><span style={{ width: `${progress}%` }} /></div>

        <article className="card">
          <h1>{question.question}</h1>
          <p>Select the correct option from the choices below.</p>
          <div className="options">
            {question.options.map((opt) => (
              <button
                key={opt}
                className={`option ${selectedOption === opt ? 'selected' : ''}`}
                onClick={() => setSelectedOption(opt)}
              >
                <div className={`radio ${selectedOption === opt ? 'active' : ''}`} />
                <span className="label">{opt}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <footer className="footer">
        <button
          className="ghost"
          onClick={() => {
            if (currentQ > 0) {
              setCurrentQ(prev => prev - 1);
              setSelectedOption(null);
            }
          }}
          disabled={currentQ === 0}
        >
          ← Back
        </button>
        <button
          className="primary"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentQ === questions.length - 1 ? 'Finish Section' : 'Next Question'} →
        </button>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .top { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; }
        .ghost { background: var(--card); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(0,0,0,0.08); text-decoration: none; color: var(--on-surface); font-weight: 700; cursor: pointer; }
        .ghost:disabled { opacity: 0.5; cursor: not-allowed; }
        .title { font-weight: 700; }
        .body { padding: 0 24px 24px; display: grid; gap: 16px; max-width: 600px; width: 100%; margin: 0 auto; }
        .progress { display: flex; justify-content: space-between; align-items: center; }
        .meta { color: var(--on-surface-variant); font-weight: 600; }
        .pill { background: var(--secondary); color: var(--on-secondary); padding: 8px 12px; border-radius: 999px; font-weight: 700; }
        .bar { height: 10px; background: var(--secondary); border-radius: 8px; overflow: hidden; }
        .bar span { display: block; height: 100%; background: var(--primary); transition: width 0.3s ease; }
        .card { background: var(--card); border-radius: 20px; padding: 24px; box-shadow: var(--shadow); display: grid; gap: 12px; }
        .card h1 { margin: 0; font-size: clamp(24px, 3vw, 28px); line-height: 1.3; }
        .card p { margin: 0; color: var(--on-surface-variant); }
        .options { display: grid; gap: 12px; margin-top: 8px; }
        .option { width: 100%; text-align: left; padding: 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; cursor: pointer; transition: all 0.2s; }
        .option:hover { border-color: rgba(100,74,64,0.4); box-shadow: 0 8px 18px rgba(0,0,0,0.08); }
        .option.selected { border-color: var(--primary); background: rgba(100,74,64,0.05); }
        .radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.2); position: relative; }
        .radio.active { border-color: var(--primary); }
        .radio.active::after { content: ''; position: absolute; inset: 4px; background: var(--primary); border-radius: 50%; }
        .label { font-weight: 600; }
        .footer { margin-top: auto; padding: 20px 24px 32px; display: flex; gap: 12px; justify-content: center; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; }
        .footer .primary { flex: 1; text-align: center; background: var(--primary); color: var(--on-primary); padding: 14px; border-radius: 14px; font-weight: 700; border: none; box-shadow: 0 12px 24px rgba(100,74,64,0.25); cursor: pointer; }
        .footer .primary:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
        .footer .ghost { width: auto; padding: 0 24px; border-radius: 14px; background: var(--secondary); color: var(--on-secondary); border: none; }
        @media (max-width: 768px) { .body { padding: 0 16px 16px; } .top { padding: 12px 16px; } }
      `}</style>
    </main>
  );
}
