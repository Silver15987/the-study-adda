import { motion } from 'framer-motion';

const dummyData = [
    { rank: 1, name: "CosmicScholar", hours: 120, xp: 5000, avatar: "👨‍🚀" },
    { rank: 2, name: "NebulaNavigator", hours: 115, xp: 4800, avatar: "👽" },
    { rank: 3, name: "StarStudent", hours: 100, xp: 4200, avatar: "👩‍🚀" },
    { rank: 4, name: "GalaxyBrain", hours: 95, xp: 3900, avatar: "🤖" },
    { rank: 5, name: "VoidWalker", hours: 90, xp: 3600, avatar: "👾" },
];

function PodiumCard({ user, delay }) {
    const isFirst = user.rank === 1;
    const height = isFirst ? 'h-80' : 'h-64';
    const color = isFirst ? 'border-yellow-500 shadow-yellow-500/20' : user.rank === 2 ? 'border-gray-400 shadow-gray-400/20' : 'border-orange-700 shadow-orange-700/20';
    const glow = isFirst ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-orange-700';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className={`relative ${height} w-full glass-card rounded-t-3xl border-t-4 ${color} flex flex-col items-center justify-end p-6 group hover:-translate-y-2 transition-transform duration-500`}
        >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full ${glow} p-1 shadow-lg z-10 flex items-center justify-center text-4xl`}>
                {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
            </div>

            <div className="text-center mt-8">
                <h3 className="font-display font-bold text-xl text-white mb-1">{user.name}</h3>
                <p className="text-accent-cyan font-mono text-sm">{user.xp} XP</p>
            </div>

            <div className="mt-auto w-full text-center py-2 bg-white/5 rounded-lg backdrop-blur-sm">
                <span className="font-bold text-2xl text-white">{user.hours}h</span>
            </div>

            {/* Light beam effect */}
            <div className={`absolute inset-0 bg-gradient-to-t from-${glow}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    );
}

export default function Leaderboard() {
    const top3 = dummyData.slice(0, 3);
    const rest = dummyData.slice(3);

    // Reorder for podium: 2, 1, 3
    const podiumOrder = [top3[1], top3[0], top3[2]];

    return (
        <section id="leaderboard" className="py-32 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
                        TOP COMMANDERS
                    </h2>
                    <p className="text-gray-400 text-lg font-sans tracking-wide">Elite scholars of the month</p>
                </motion.div>

                {/* Podium */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 items-end mb-16 max-w-4xl mx-auto">
                    {podiumOrder.map((user, i) => (
                        <PodiumCard key={user.rank} user={user} delay={i * 0.2} />
                    ))}
                </div>

                {/* List */}
                <div className="glass-panel rounded-2xl overflow-hidden max-w-4xl mx-auto">
                    {rest.map((user, index) => (
                        <motion.div
                            key={user.rank}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-6">
                                <span className="font-display text-xl text-gray-500">#{user.rank}</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                        {user.avatar}
                                    </div>
                                    <span className="font-bold text-lg text-white">{user.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="text-gray-400 font-mono">{user.hours}h</span>
                                <span className="text-accent-cyan font-bold">{user.xp} XP</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
