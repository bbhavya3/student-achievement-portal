import { useState, useEffect } from "react";
import "./Dashboard.css";

// activeTab అనే prop ని Navbar నుండి App.js ద్వారా ఇక్కడకు తీసుకుంటున్నాం
export default function Dashboard({ activeTab }) {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : [];
  });

  // Form input states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [achievements]);

  const addAchievement = (e) => {
    e.preventDefault();
    const newEntry = { 
      title, 
      category, 
      date: date || new Date().toLocaleDateString('en-GB'), 
      description 
    };
    setAchievements([newEntry, ...achievements]);
    
    // Form reset logic
    setTitle("");
    setDate("");
    setDescription("");
    
    // Add cheshaka automatically Dashboard tab ki vellalante (optional)
    alert("Achievement Added Successfully!");
  };

  const deleteAchievement = (index) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const updated = achievements.filter((_, i) => i !== index);
      setAchievements(updated);
    }
  };

  // Stats Logic
  const totalCount = achievements.length;
  const sportsCount = achievements.filter(a => a.category.toLowerCase() === 'sports').length;
  const techCount = achievements.filter(a => a.category.toLowerCase() === 'tech').length;
  const formatNum = (num) => num.toString().padStart(2, '0');

  // Logic to switch between Dashboard and Add Form
  const isFormVisible = activeTab === "Add";

  return (
    <div className="dashboard-content">
      {/* Header Section */}
      <div className="dashboard-header">
        <h2 className="page-title">
          {isFormVisible ? "| Add New Achievement" : "| Student Dashboard"}
        </h2>
      </div>

      {!isFormVisible ? (
        <>
          {/* 1. Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card-glass">
              <div className="stat-icon-box total">📊</div>
              <div className="stat-info">
                <span className="stat-label">TOTAL</span>
                <h2 className="stat-value">{formatNum(totalCount)}</h2>
              </div>
            </div>
            <div className="stat-card-glass">
              <div className="stat-icon-box sports">⚽</div>
              <div className="stat-info">
                <span className="stat-label">SPORTS</span>
                <h2 className="stat-value">{formatNum(sportsCount)}</h2>
              </div>
            </div>
            <div className="stat-card-glass">
              <div className="stat-icon-box tech">💻</div>
              <div className="stat-info">
                <span className="stat-label">TECH</span>
                <h2 className="stat-value">{formatNum(techCount)}</h2>
              </div>
            </div>
          </div>

          {/* 2. Achievement List - Card View */}
          <div className="my-list-section">
            <h3 className="section-subtitle">Recent Achievements</h3>
            <div className="achievement-cards-stack">
              {achievements.length === 0 ? (
                <div className="empty-state">No achievements added yet. Click "Add Achievement" in sidebar!</div>
              ) : (
                achievements.map((a, i) => (
                  <div key={i} className="achievement-long-card">
                    <div className="card-left">
                      <div className={`icon-circle ${a.category.toLowerCase()}`}>
                        {a.category.toLowerCase() === 'tech' ? '💻' : a.category.toLowerCase() === 'sports' ? '🏆' : '✨'}
                      </div>
                      <div className="card-main-info">
                        <h4>{a.title}</h4>
                        <p className="description">{a.description || "Consistent performance and dedication showcased."}</p>
                        <span className={`category-pill ${a.category.toLowerCase()}`}>{a.category.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="card-right">
                      <span className="card-date">{a.date}</span>
                      <div className="card-actions">
                        <button className="view-cert-btn">View Certificate</button>
                        <button className="delete-btn-icon" onClick={() => deleteAchievement(i)}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        /* 3. Add New Form Section */
        <div className="form-container-glass">
          <form onSubmit={addAchievement} className="achievement-form">
            <div className="form-header">
              <h3>✨ Share Your Success</h3>
              <p>Fill in the details to post your latest achievement.</p>
            </div>

            <div className="input-group">
              <label>ACHIEVEMENT TITLE</label>
              <input type="text" placeholder="e.g. Hackathon Winner 2024" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="row">
              <div className="input-group">
                <label>CATEGORY</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Tech">Tech</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
              <div className="input-group">
                <label>DATE</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="input-group">
              <label>SHORT DESCRIPTION</label>
              <textarea rows="4" placeholder="Briefly describe your achievement..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <button type="submit" className="post-btn">🚀 Post Achievement</button>
          </form>
        </div>
      )}
    </div>
  );
}