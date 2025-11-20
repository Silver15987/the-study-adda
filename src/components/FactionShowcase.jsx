import { motion } from 'framer-motion';

const factions = [
    {
        id: 'void',
        name: 'Void Walkers',
        description: 'Masters of deep focus and late-night study sessions. They thrive in the quiet of the cosmos.',
        color: 'from-purple-600 to-indigo-900',
        icon: '🌌',
        stats: { members: '1.2k', power: '98%' }
    },
    {
        id: 'solar',
        name: 'Solar Vanguards',
        description: 'Early risers who harness the energy of the sun. Consistent, bright, and unstoppable.',
        color: 'from-amber-500 to-orange-700',
        icon: '☀️',
        stats: { members: '850', power: '92%' }
    },
    {
        id: 'nebula',
        name: 'Nebula Scholars',
        description: 'Creative thinkers who connect the dots between stars. Innovation is their currency.',
        color: 'from-cyan-500 to-blue-800',
        icon: '✨',
        stats: { members: '940', power: '95%' }
    }
];

export default function FactionShowcase() {
    return (
        <section id="factions" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
                        CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ALLEGIANCE</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join one of the three legendary factions. Compete for dominance, earn unique rewards, and etch your name in the stars.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {factions.map((faction, index) => (
                        <motion.div
                            key={faction.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-b ${faction.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl`}></div>

                            <div className="relative h-full glass-panel p-8 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-500">
                                    {faction.icon}
                                </div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-4xl mb-6 shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        {faction.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white font-display mb-3">{faction.name}</h3>
                                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                        {faction.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Members</p>
                                            <p className="text-lg font-bold text-white font-mono">{faction.stats.members}</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Power</p>
                                            <p className="text-lg font-bold text-white font-mono">{faction.stats.power}</p>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white font-bold transition-all uppercase tracking-widest text-sm group-hover:bg-purple-600 group-hover:border-purple-500">
                                        Join Faction
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
