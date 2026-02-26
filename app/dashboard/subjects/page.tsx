"use client";

const subjects = [
    { id: 1, name: "Mathematics", progress: 75, nextLesson: "Integration Rules", icon: "📐" },
    { id: 2, name: "Physics", progress: 45, nextLesson: "Quantum Mechanics", icon: "⚛️" },
    { id: 3, name: "Chemistry", progress: 60, nextLesson: "Organic Compounds", icon: "🧪" },
    { id: 4, name: "History", progress: 30, nextLesson: "World War II", icon: "📜" },
    { id: 5, name: "Literature", progress: 90, nextLesson: "Shakespeare's Sonnets", icon: "📖" },
];

export default function SubjectsPage() {
    return (
        <div className="subjects-page">
            <header className="page-header">
                <h1>My Subjects</h1>
                <button className="primary-btn">+ Enrol New</button>
            </header>

            <div className="subjects-grid">
                {subjects.map((sub) => (
                    <article key={sub.id} className="subject-card">
                        <div className="card-top">
                            <div className="icon-box">{sub.icon}</div>
                            <div className="more-opt">•••</div>
                        </div>

                        <div className="card-info">
                            <h3>{sub.name}</h3>
                            <p className="next">Next: {sub.nextLesson}</p>
                        </div>

                        <div className="progress-section">
                            <div className="progress-labels">
                                <span>Progress</span>
                                <span>{sub.progress}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="fill" style={{ width: `${sub.progress}%` }} />
                            </div>
                        </div>

                        <button className="continue-btn">Continue Learning</button>
                    </article>
                ))}
            </div>

            <style jsx>{`
        .subjects-page { display: flex; flex-direction: column; gap: 32px; }
        .page-header { display: flex; justify-content: space-between; align-items: center; }
        .page-header h1 { margin: 0; font-size: 28px; }
        
        .primary-btn {
          background: var(--primary);
          color: var(--on-primary);
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(100,74,64,0.3);
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .subject-card {
          background: var(--card);
          padding: 24px;
          border-radius: 20px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          gap: 20px;
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.2s;
        }
        .subject-card:hover { transform: translateY(-4px); }

        .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .icon-box {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: var(--surface);
          display: grid;
          place-items: center;
          font-size: 28px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .more-opt { color: var(--on-surface-variant); font-weight: bold; cursor: pointer; letter-spacing: 1px; }

        .card-info h3 { margin: 0 0 4px; font-size: 20px; }
        .card-info .next { margin: 0; font-size: 14px; color: var(--on-surface-variant); }

        .progress-section { display: grid; gap: 8px; }
        .progress-labels { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); }
        .progress-bar { height: 8px; background: var(--surface); border-radius: 4px; overflow: hidden; }
        .fill { height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.5s ease-out; }

        .continue-btn {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          background: transparent;
          border-radius: 12px;
          font-weight: 600;
          color: var(--on-surface);
          cursor: pointer;
          transition: all 0.2s;
        }
        .continue-btn:hover { background: var(--surface); border-color: rgba(0,0,0,0.2); }
      `}</style>
        </div>
    );
}
