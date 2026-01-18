import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DailyGoalsSetup({ onSave }) {
    const [goals, setGoals] = useState(Array(10).fill(''));
    const [loading, setLoading] = useState(false);

    const handleGoalChange = (index, value) => {
        const newGoals = [...goals];
        newGoals[index] = value;
        setGoals(newGoals);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (goals.some(g => g.trim() === '')) {
            alert("Please define all 10 goals to start the challenge!");
            return;
        }

        setLoading(true);
        // Simulate API call or pass to parent
        await onSave(goals);
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Define Your 10 Daily Habits</h2>
                    <p className="text-gray-400">
                        Choose 10 actionable tasks you commit to doing every single day for 21 days.
                        <br />Consistency is key. Make them challenging but achievable.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {goals.map((goal, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group"
                            >
                                <label className="block text-cyan-400 text-sm font-bold mb-2 uppercase tracking-wider">
                                    Goal #{index + 1}
                                </label>
                                <input
                                    type="text"
                                    value={goal}
                                    onChange={(e) => handleGoalChange(index, e.target.value)}
                                    placeholder={`e.g. Read for 30 mins`}
                                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none transition-all focus:bg-white/10"
                                    required
                                />
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-8 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Committing...' : 'START 21-DAY CHALLENGE'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
