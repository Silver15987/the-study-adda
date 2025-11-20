import { motion } from 'framer-motion';

const members = [
    { name: "AstroPhysicist", role: "Event Winner", desc: "Won the Deep Focus challenge.", color: "from-purple-500 to-indigo-600", icon: "🏆" },
    { name: "QuantumQueen", role: "Top Contributor", desc: "Helped 50+ members in math.", color: "from-pink-500 to-rose-600", icon: "⭐" },
    { name: "TechTitan", role: "Community Pillar", desc: "Hosted 3 workshops.", color: "from-cyan-500 to-blue-600", icon: "🤝" },
];

export default function MembersOfNote() {
    return (
        <section id="members" className="py-32 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-white">
                        HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LEGENDS</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, rotateX: 10 }}
                            whileInView={{ opacity: 1, rotateX: 0 }}
                            transition={{ delay: index * 0.2, type: "spring" }}
                            className="group relative h-[400px] perspective-1000"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12 shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
                                {/* Holographic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ mixBlendMode: 'overlay' }} />

                                <div className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10">
                                    <div className={`w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br ${member.color} p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-500`}>
                                        <div className="w-full h-full bg-[#050505] rounded-2xl flex items-center justify-center text-5xl">
                                            {member.icon}
                                        </div>
                                    </div>

                                    <h3 className="font-display text-3xl font-bold text-white mb-3">{member.name}</h3>
                                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-widest bg-gradient-to-r ${member.color} text-white mb-6`}>
                                        {member.role}
                                    </span>
                                    <p className="text-gray-400 leading-relaxed font-sans">
                                        {member.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
