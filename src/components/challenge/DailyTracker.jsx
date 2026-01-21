import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyTracker({ user, logs, challengeStatus, onLogDay, readOnly }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(Array(10).fill(false));
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    // Reset form when day changes
    useEffect(() => {
        if (selectedDay) {
            const log = logs.find(l => l.dayNumber === selectedDay);
            if (log) {
                setCompletedTasks(log.completedTasks);
                setNote(log.note || '');
            } else {
                setCompletedTasks(Array(10).fill(false));
                setNote('');
            }
        }
    }, [selectedDay, logs]);

    // Generate 21 days
    const days = Array.from({ length: 21 }, (_, i) => i + 1);

    const handleDayClick = (day) => {
        if (!challengeStatus) return;

        // NEW: If readOnly is true, we ONLY allow viewing history (past/completed days), 
        // OR we allow opening the modal but enforcing "View Only" mode regardless of date.
        // Let's enforce the "View Only" state if readOnly prop is passed.

        if (day > challengeStatus.dayNumber) return; // Future

        setSelectedDay(day);
    };

    // Override isDayLocked if readOnly is true
    const isLocked = (day) => {
        if (readOnly) return true;
        return isDayLocked(day);
    }

    // Logic for locking based on date
    const isDayLocked = (day) => {
        if (!challengeStatus) return true;

        const currentDay = challengeStatus.dayNumber;
        const isGracePeriodActive = challengeStatus.isGracePeriodActive;

        // If day is Today: Unlocked
        if (day === currentDay) return false;

        // If day is Yesterday: Unlocked ONLY if Grace Period is active
        if (day === currentDay - 1) {
            return !isGracePeriodActive; // Locked if grace period EXPIRED (false)
        }

        // All other past days are locked
        return true;
    };



    const handleSave = async () => {
        if (!challengeStatus) return;

        setLoading(true);
        // Calculate the date for the selected day
        // This is tricky without the exact date map, but we know Day 1 = Start Date
        // Ideally backend handles "dayNumber" -> "date" logic or we pass the date map
        // For now, let's rely on the date string if we can calculate it, OR just pass dayNumber and let backend resolve date? 
        // Actually, backend expects `date`. 
        // Let's approximate: Start Date + (day-1) 

        const startDate = new Date(challengeStatus.startDate);
        startDate.setDate(startDate.getDate() + (selectedDay - 1));
        const logDate = startDate.toISOString().split('T')[0];

        await onLogDay({
            dayNumber: selectedDay,
            date: logDate,
            completedTasks,
            note
        });
        setLoading(false);
        setSelectedDay(null);
    };

    return (
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 md:p-6">
            <h3 className="text-xl font-bold text-white mb-6">Your 21-Day Journey</h3>

            <div className="grid grid-cols-7 gap-2 md:gap-3 mb-8">
                {days.map((day) => {
                    const log = logs.find(l => l.dayNumber === day);
                    const isCompleted = !!log;
                    const isFuture = challengeStatus ? day > challengeStatus.dayNumber : true;
                    // Locked if past window
                    const isLockedVal = isLocked(day);
                    const isToday = challengeStatus?.dayNumber === day;

                    let bgClass = "bg-white/5 border-white/10 text-gray-400";
                    if (isFuture) {
                        bgClass = "opacity-30 cursor-not-allowed border-none";
                    } else if (isCompleted) {
                        bgClass = isLockedVal
                            ? "bg-cyan-900/20 border-cyan-900/50 text-cyan-700" // Completed & Locked (History)
                            : "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"; // Completed & Editable
                    } else if (isLockedVal) {
                        bgClass = "bg-red-900/10 border-red-900/20 text-red-900/50 line-through decoration-red-900/50"; // Missed & Locked
                    } else if (isToday) {
                        bgClass = "bg-white/10 border-white/40 text-white animate-pulse-slow border-dashed"; // Today (Active, no log yet)
                    }

                    return (
                        <motion.button
                            key={day}
                            disabled={isFuture}
                            whileHover={!isFuture ? { scale: 1.05 } : {}}
                            whileTap={!isFuture ? { scale: 0.95 } : {}}
                            onClick={() => handleDayClick(day)}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center font-mono text-sm md:text-lg font-bold border transition-all relative overflow-hidden ${bgClass}`}
                        >
                            <span>{day}</span>
                            {/* History Score Badge */}
                            {log && <span className="text-[10px] mt-1 opacity-80">{log.dailyScore}/10</span>}
                            {/* Missed Badge */}
                            {!log && isLockedVal && !isFuture && <span className="text-[8px] mt-0.5 text-red-500/50">MISSED</span>}
                        </motion.button>
                    );
                })}
            </div>

            {/* Daily Entry Modal/Panel */}
            <AnimatePresence>
                {selectedDay && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-zinc-900/80 rounded-xl border border-white/10 p-4 md:p-6 overflow-hidden relative"
                    >
                        {/* Read Only/Locked Overlay */}
                        {isLocked(selectedDay) && (
                            <div className="absolute top-0 right-0 p-2">
                                <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-500/30">
                                    🔒 VIEW ONLY
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-lg font-bold text-white">
                                {isLocked(selectedDay) ? `History: Day ${selectedDay}` : `Log Day ${selectedDay}`}
                            </h4>
                            <div className="text-cyan-400 font-bold text-lg md:text-xl">
                                Score: {completedTasks.filter(Boolean).length} / 10
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            {user.goals.map((goal, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isLocked(selectedDay) ? 'opacity-80' : 'hover:bg-white/5 cursor-pointer bg-black/20'
                                        }`}
                                    onClick={() => !isLocked(selectedDay) && (() => {
                                        const newTasks = [...completedTasks];
                                        newTasks[index] = !newTasks[index];
                                        setCompletedTasks(newTasks);
                                    })()}
                                >
                                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${completedTasks[index] ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600 bg-transparent'
                                        }`}>
                                        {completedTasks[index] && <span className="text-white text-sm">✓</span>}
                                    </div>
                                    <span className={`flex-1 ${completedTasks[index] ? 'text-white' : 'text-gray-400'}`}>
                                        {goal}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <textarea
                            placeholder="Note for the day..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={isLocked(selectedDay)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 mb-4 h-20 resize-none disabled:opacity-50"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedDay(null)}
                                className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 font-bold"
                            >
                                Close
                            </button>
                            {!isLocked(selectedDay) && (
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20"
                                >
                                    {loading ? 'Saving...' : 'Confirm Day'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
