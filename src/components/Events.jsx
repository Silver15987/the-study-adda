import { motion } from 'framer-motion';

const events = [
    { title: "Deep Focus Night", date: "Every Friday", time: "8:00 PM EST", desc: "4 hours of intense study with lofi beats.", type: "Weekly" },
    { title: "Math Marathon", date: "Nov 25th", time: "2:00 PM EST", desc: "Solve as many problems as you can!", type: "Special" },
];

const clubs = [
    { name: "Book Club", members: 120, desc: "Discussing 'Atomic Habits' this month.", color: "bg-emerald-500" },
    { name: "Code Corner", members: 85, desc: "Building a React app together.", color: "bg-blue-500" },
    { name: "Language Lounge", members: 60, desc: "Practice Spanish and Japanese.", color: "bg-rose-500" },
];

export default function Events() {
    return (
        <section id="events" className="py-20 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Events Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="mb-8 flex items-center gap-4"
                        >
                            <h2 className="text-4xl font-bold text-white">Upcoming Events</h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                        </motion.div>

                        <div className="space-y-6">
                            {events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${event.type === 'Weekly' ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-500/20 text-orange-300'}`}>
                                                {event.type}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white">{event.date}</div>
                                            <div className="text-sm text-gray-400">{event.time}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-4">{event.desc}</p>
                                    <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors border border-white/10">
                                        Register Now
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Clubs Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="mb-8 flex items-center gap-4"
                        >
                            <h2 className="text-4xl font-bold text-white">Active Clubs</h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-6">
                            {clubs.map((club, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 flex items-center gap-6"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${club.color} bg-opacity-20 flex items-center justify-center text-2xl`}>
                                        {club.name[0]}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="text-xl font-bold text-white">{club.name}</h3>
                                            <span className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded">
                                                {club.members} Members
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{club.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
