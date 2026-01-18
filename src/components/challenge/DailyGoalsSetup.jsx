import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyGoalsSetup({ onSave }) {
    const [goals, setGoals] = useState(Array(5).fill(''));
    const [loading, setLoading] = useState(false);

    const handleGoalChange = (index, value) => {
        const newGoals = [...goals];
        newGoals[index] = value;
        setGoals(newGoals);
    };

    const addGoal = () => {
        setGoals([...goals, '']);
    };

    const removeGoal = (index) => {
        if (goals.length <= 5) return;
        const newGoals = goals.filter((_, i) => i !== index);
        setGoals(newGoals);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (goals.some(g => g.trim() === '')) {
            alert("Please fill in all goal fields!");
            return;
        }

        if (goals.length < 5) {
            alert("You need at least 5 goals to start.");
            return;
        }

        setLoading(true);
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Define Your Daily Habits</h2>
                    <p className="text-gray-400">
                        Choose at least 5 actionable tasks you commit to doing every single day for 21 days.
                        <br />Consistency is key. Make them challenging but achievable.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <AnimatePresence>
                            {goals.map((goal, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-end gap-3"
                                >
                                    <div className="flex-1">
                                        <label className="block text-cyan-400 text-xs font-bold mb-1 uppercase tracking-wider">
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
                                    </div>
                                    {goals.length > 5 && (
                                        <button
                                            type="button"
                                            onClick={() => removeGoal(index)}
                                            className="mb-[2px] p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Remove Goal"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            type="button"
                            onClick={addGoal}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-2 hover:bg-cyan-500/10 rounded-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Another Goal
                        </button>
                    </div>

                    <div className="pt-8 text-center border-t border-white/10 mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                        >
                            {loading ? 'Committing...' : `START CHALLENGE (${goals.length} Goals)`}
                        </button>
                        <p className="text-gray-500 text-sm mt-4">
                            You are committing to {goals.length} tasks daily. Good luck!
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
