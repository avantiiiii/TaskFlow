import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Taskboard from "../components/Taskboard";

function Dashboard() {
const navigate = useNavigate();
const [user, setUser] = useState(null);


const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0
});

useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await API.get("/auth/profile");
            setUser(response.data.user);
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    fetchProfile();
}, [navigate]);

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

return (
    <div className="dashboard-layout">
        <aside className="sidebar">
            <div className="brand">Task<span>Flow.</span></div>
            <p className="sidebar-label">WORKSPACE</p>

            <nav>
                <a href="/dashboard" className="nav-item active">
                    ◫ &nbsp; Overview
                </a>
                <a href="#tasks" className="nav-item">
                    ▤ &nbsp; My Tasks
                </a>
            </nav>

            <div className="sidebar-bottom">
                <button className="logout-button" onClick={handleLogout}>
                    ↪ &nbsp; Logout
                </button>
            </div>
        </aside>

        <main className="dashboard-main">
            <header className="dashboard-topbar">
                <p>Workspace / Overview</p>
                <div className="profile-avatar">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
            </header>

            <section className="welcome-section">
                <h1>Good to see you, {user?.name || "there"} 👋</h1>
                <p>Here's what's happening with your workspace today.</p>
            </section>

            <section className="stats-grid">
                <div className="stat-card">
                    <p>Total Tasks</p>
                    <h2>{stats.total}</h2>
                </div>

                <div className="stat-card">
                    <p>In Progress</p>
                    <h2>{stats.inProgress}</h2>
                </div>

                <div className="stat-card">
                    <p>Completed</p>
                    <h2>{stats.completed}</h2>
                </div>
            </section>

            <section className="section-card" id="tasks">
                <div className="section-heading">
                    <h2>Your Task Board</h2>
                </div>

                <Taskboard onStatsUpdate={setStats} />
            </section>
        </main>
    </div>
);


}

export default Dashboard;
