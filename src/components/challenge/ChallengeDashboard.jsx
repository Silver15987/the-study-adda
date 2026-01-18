import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DailyGoalsSetup from './DailyGoalsSetup';
import DailyTracker from './DailyTracker';
import TimeTravelDebug from './TimeTravelDebug';
import { getApiUrl, AUTH_URL } from '../../utils/apiConfig';

export default function ChallengeDashboard() {
    const [user, setUser] = useState({
        username: '',
        challengeStarted: false,
        goals: [],
        totalScore: 0
    });
    const [challengeStatus, setChallengeStatus] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const [meRes, statusRes, logsRes] = await Promise.all([
                fetch(getApiUrl('/auth/me'), { credentials: 'include' }),
                fetch(getApiUrl('/api/challenge/status'), { credentials: 'include' }),
                fetch(getApiUrl('/api/challenge/logs'), { credentials: 'include' })
            ]);

            const meData = await meRes.json();
            const statusData = await statusRes.json();
            const logsData = await logsRes.json();

            if (meData.authenticated) {
                setUser({
                    username: meData.user.username,
                    challengeStarted: meData.user.challengeStarted,
                    goals: meData.user.goals || [],
                    totalScore: meData.user.totalScore || 0
                });
                setChallengeStatus(statusData);
                setLogs(logsData);
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            console.error("Failed to load dashboard data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSaveGoals = async (goals) => {
        setLoading(true);
        try {
            const res = await fetch(getApiUrl('/api/challenge/start'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ goals })
            });
            const data = await res.json();

            if (data.success) {
                await fetchData(); // Refresh all
            } else {
                alert(data.error || "Failed to start challenge");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving goals");
        }
        setLoading(false);
    };

    const handleLogDay = async (logData) => {
        try {
            const res = await fetch(getApiUrl('/api/challenge/log'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(logData)
            });
            const data = await res.json();

            if (data.success) {
                // Optimistic update or refresh
                await fetchData();
                alert("Day logged successfully!");
            } else {
                alert(data.error || "Failed to log day");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to log day");
        }
    };

    // Prepare Graph Data
    const graphData = Array.from({ length: 21 }, (_, i) => {
        const dayNum = i + 1;
        const log = logs.find(l => l.dayNumber === dayNum);
        return {
            day: dayNum,
            dailyScore: log ? log.dailyScore : 0,
            tasksCompleted: log ? log.dailyScore : 0,
            isLogged: !!log
        };
    });

    if (loading) return <div className="min-h-screen pt-24 text-center text-white">Loading Mission Data...</div>;

    if (!user.challengeStarted) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/header.png')] opacity-10 bg-cover bg-center"></div>
                <DailyGoalsSetup onSave={handleSaveGoals} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-zinc-950 relative">
            <TimeTravelDebug onTimeChange={fetchData} />
            <div className="absolute inset-0 bg-[url('/header.png')] opacity-5 bg-cover bg-center fixed"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Tracker */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-2xl p-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.username}</h1>
                                <p className="text-cyan-200 text-lg">Total Consistency Score: <span className="font-bold text-white">{user.totalScore}</span> / 210</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Current Server Date: {challengeStatus?.currentDate} (Day {challengeStatus?.dayNumber})
                                </p>
                            </div>
                        </div>

                        {/* Graphs Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Graph 1: Points Trend (Line) */}
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 h-[300px]">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Score Trajectory</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={graphData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#666" domain={[0, 10]} tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                        <Line type="monotone" dataKey="dailyScore" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Graph 2: Consistency/Volume (Bar) */}
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 h-[300px]">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Daily Volume</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={graphData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#666" domain={[0, 10]} tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <Bar dataKey="tasksCompleted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Tracker Grid */}
                        <DailyTracker
                            user={user}
                            logs={logs}
                            challengeStatus={challengeStatus}
                            onLogDay={handleLogDay}
                        />
                    </div>

                    {/* Right Column: Goal List (Quick View) */}
                    <div className="space-y-6">
                        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Your Daily 10</h3>
                            <ul className="space-y-4">
                                {user.goals.map((goal, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <span className="text-cyan-500 font-bold mt-0.5">{i + 1}.</span>
                                        {goal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
