import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DailyGoalsSetup from './DailyGoalsSetup';
import DailyTracker from './DailyTracker';
import TimeTravelDebug from './TimeTravelDebug';
import { getApiUrl, AUTH_URL } from '../../utils/apiConfig';

export default function ChallengeDashboard() {
    const MOCK_MODE = false; // TOGGLE THIS FOR LOCAL TESTING

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
            if (MOCK_MODE) {
                // Skip fetch in mock mode
                var meRes = {}, statusRes = {}, logsRes = {};
            } else {
                var [meRes, statusRes, logsRes] = await Promise.all([
                    fetch(getApiUrl('/auth/me'), { credentials: 'include' }),
                    fetch(getApiUrl('/api/challenge/status'), { credentials: 'include' }),
                    fetch(getApiUrl('/api/challenge/logs'), { credentials: 'include' })
                ]);
            }

            const meData = MOCK_MODE ? {} : await meRes.json();
            const statusData = MOCK_MODE ? {} : await statusRes.json();
            const logsData = MOCK_MODE ? {} : await logsRes.json();

            if (MOCK_MODE) {
                // Mock Data Injection
                setUser({
                    username: 'MockUser',
                    challengeStarted: true,
                    goals: ['Drink Water', 'Read 20 pages', 'Exercise', 'Code', 'Meditate'],
                    totalScore: 105
                });
                setChallengeStatus({
                    currentDate: '2026-01-23', // Simulated Date
                    dayNumber: 5,
                    startDate: '2026-01-19'
                });
                setLogs([
                    { dayNumber: 1, dailyScore: 8, completedTasks: [true, true, true, true, false], date: '2026-01-19' },
                    { dayNumber: 2, dailyScore: 9, completedTasks: [true, true, true, true, true], date: '2026-01-20' },
                    { dayNumber: 3, dailyScore: 5, completedTasks: [true, false, true, false, false], date: '2026-01-21' },
                    { dayNumber: 4, dailyScore: 10, completedTasks: [true, true, true, true, true], date: '2026-01-22' },
                    { dayNumber: 5, dailyScore: 0, completedTasks: [false, false, false, false, false], date: '2026-01-23' } // Today
                ]);
                return;
            }

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
                console.warn('User not authenticated, redirecting...');
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
            let data;
            if (MOCK_MODE) {
                await new Promise(r => setTimeout(r, 500)); // Simulate delay
                data = { success: true };
                // Update local state to reflect started challenge
                setUser(prev => ({ ...prev, challengeStarted: true, goals }));
            } else {
                const res = await fetch(getApiUrl('/api/challenge/start'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ goals })
                });
                data = await res.json();
            }

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
            let data;
            if (MOCK_MODE) {
                await new Promise(r => setTimeout(r, 300));
                data = { success: true };
                // Locally update logs for immediate UI feedback in mock mode
                setLogs(prev => {
                    const existing = prev.findIndex(l => l.dayNumber === logData.dayNumber);
                    const newLog = { ...logData, dailyScore: logData.completedTasks.filter(Boolean).length };
                    if (existing >= 0) {
                        const newLogs = [...prev];
                        newLogs[existing] = newLog;
                        return newLogs;
                    }
                    return [...prev, newLog];
                });
            } else {
                const res = await fetch(getApiUrl('/api/challenge/log'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(logData)
                });
                data = await res.json();
            }

            if (data.success) {
                // Optimistic update or refresh
                if (!MOCK_MODE) {
                    await fetchData();
                }
                // alert("Day logged successfully!"); // Removed to prevent spam
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
                        <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-0">
                            <div className="w-full md:w-auto">
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome, {user.username}</h1>

                                <div className="mt-4 mb-2 w-full max-w-sm mx-auto md:mx-0">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">
                                        <span>Today's Progress</span>
                                        <span>{(() => {
                                            if (!challengeStatus) return '0%';
                                            const todayLog = logs.find(l => l.date === challengeStatus.currentDate);
                                            const completed = todayLog ? todayLog.completedTasks.filter(Boolean).length : 0;
                                            const total = user.goals.length || 10;
                                            const pct = Math.round((completed / total) * 100);
                                            return `${pct}%`;
                                        })()}</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: (() => {
                                                    if (!challengeStatus) return '0%';
                                                    const todayLog = logs.find(l => l.date === challengeStatus.currentDate);
                                                    const completed = todayLog ? todayLog.completedTasks.filter(Boolean).length : 0;
                                                    const total = user.goals.length || 10;
                                                    return `${(completed / total) * 100}%`;
                                                })()
                                            }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                    </div>
                                </div>

                                <p className="text-cyan-200 text-lg mt-3">Total Consistency Score: <span className="font-bold text-white">{user.totalScore}</span> / 210</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Current Server Date: {challengeStatus?.currentDate} (Day {challengeStatus?.dayNumber})
                                </p>
                            </div>
                        </div>

                        {/* Graphs Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Graph 1: Points Trend (Line) */}
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 h-[250px] md:h-[300px]">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Score Trajectory</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={graphData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} minTickGap={15} />
                                        <YAxis stroke="#666" domain={[0, 10]} tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                        <Line type="monotone" dataKey="dailyScore" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Graph 2: Consistency/Volume (Bar) */}
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 h-[250px] md:h-[300px]">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Daily Volume</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={graphData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} minTickGap={15} />
                                        <YAxis stroke="#666" domain={[0, 10]} tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <Bar dataKey="tasksCompleted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Tracker Grid (History) */}
                        <DailyTracker
                            user={user}
                            logs={logs}
                            challengeStatus={challengeStatus}
                            onLogDay={handleLogDay}
                            readOnly={true} // Now acts primarily as history
                        />
                    </div>

                    {/* Right Column: Active Day Checklist */}
                    <div className="lg:col-span-1 space-y-6 order-first lg:order-last">
                        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Today's Check-In</h3>
                                <span className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                                    Day {challengeStatus?.dayNumber}
                                </span>
                            </div>

                            {/* Today's Checklist */}
                            <div className="space-y-3">
                                {user.goals.map((goal, index) => {
                                    // Derive status from logs
                                    const todayLog = logs.find(l => l.date === challengeStatus?.currentDate);
                                    const isCompleted = todayLog ? todayLog.completedTasks[index] : false;

                                    return (
                                        <div
                                            key={index}
                                            className={`group flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${isCompleted
                                                ? 'bg-cyan-500/10 border-cyan-500/50'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                            onClick={() => {
                                                const todayLog = logs.find(l => l.date === challengeStatus?.currentDate);
                                                const currentTasks = todayLog ? [...todayLog.completedTasks] : Array(user.goals.length).fill(false);
                                                currentTasks[index] = !currentTasks[index];

                                                handleLogDay({
                                                    dayNumber: challengeStatus?.dayNumber,
                                                    date: challengeStatus?.currentDate,
                                                    completedTasks: currentTasks,
                                                    note: todayLog?.note || ''
                                                });
                                            }}
                                        >
                                            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${isCompleted
                                                ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                                                : 'border-gray-500 text-transparent'
                                                }`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className={`text-sm md:text-base transition-colors ${isCompleted ? 'text-white font-medium line-through decoration-cyan-500/50' : 'text-gray-300'}`}>
                                                {goal}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Today's Note */}
                            <div className="mt-6">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Daily Reflection</label>
                                <textarea
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:border-cyan-500/50 outline-none text-sm resize-none h-24"
                                    placeholder="How did today go?"
                                    value={(() => {
                                        const todayLog = logs.find(l => l.date === challengeStatus?.currentDate);
                                        return todayLog?.note || '';
                                    })()}
                                    onChange={(e) => {
                                        // Debounce could be good here, for now direct update relative to local state might be tricky without local state.
                                        // Wait, handleLogDay triggers a fetch. Key-by-key fetch is BAD. 
                                        // We need local state for the note or a "Check-in" button.
                                        // Implementing "Check-in" button pattern for notes is safer, or onBlur.
                                    }}
                                    onBlur={(e) => {
                                        const todayLog = logs.find(l => l.date === challengeStatus?.currentDate);
                                        const currentTasks = todayLog ? [...todayLog.completedTasks] : Array(user.goals.length).fill(false);
                                        if (todayLog?.note !== e.target.value) {
                                            handleLogDay({
                                                dayNumber: challengeStatus?.dayNumber,
                                                date: challengeStatus?.currentDate,
                                                completedTasks: currentTasks,
                                                note: e.target.value
                                            });
                                        }
                                    }}
                                />
                                <p className="text-[10px] text-gray-500 mt-1 text-right">Updates saved automatically on click/blur.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
