import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl, AUTH_URL } from '../../utils/apiConfig';

// Mock Leaderboard Data (until API is connected)


export default function ConsistencyChallenge() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch(getApiUrl('/api/leaderboard'))
            .then(res => res.json())
            .then(data => setLeaderboard(data))
            .catch(err => console.error("Failed to fetch leaderboard:", err));
    }, []);

    const handleLogin = () => {
        // Redirect to Backend Auth
        window.location.href = `${AUTH_URL}/discord`;
    };

    return (
        <section id="challenge" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        CONSISTENCY <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">CHALLENGE</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        21 Days. Daily Goals. One Champion. <br />
                        Prove your discipline and climb the cosmic ranks.
                    </p>

                    <button
                        onClick={handleLogin}
                        className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300"
                    >
                        JOIN WITH DISCORD
                    </button>
                </motion.div>

                {/* Leaderboard Preview */}
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel p-1 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span>🏆</span> Current Champions
                            </h3>

                            <div className="space-y-4">
                                {(showAll ? leaderboard : leaderboard.slice(0, 5)).map((user, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : index === 1 ? 'bg-gray-400/20 text-gray-300' : index === 2 ? 'bg-amber-700/20 text-amber-600' : 'text-gray-500'}`}>
                                                {index + 1}
                                            </div>
                                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border border-white/10" />
                                            <span className="text-white font-medium">{user.username}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-cyan-400 font-bold text-lg">{user.totalScore}</span>
                                            <span className="text-gray-500 text-sm">pts</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {leaderboard.length > 5 && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 mx-auto transition-colors"
                                    >
                                        {showAll ? 'Show Top 5' : 'Show All Users'}
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
