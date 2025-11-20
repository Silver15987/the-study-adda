import { motion } from 'framer-motion';

const features = [
    {
        title: 'VC Tracking',
        description: 'Earn coins automatically just by studying in voice channels. Turn your focus time into fortune.',
        icon: '🎙️',
        color: 'text-purple-400'
    },
    {
        title: 'Economy System',
        description: 'Trade, gamble, and shop. A fully simulated economy driven by the community.',
        icon: '🪙',
        color: 'text-yellow-400'
    },
    {
        title: 'Quest Board',
        description: 'Daily and weekly missions to keep you motivated. Complete them for massive rewards.',
        icon: '📜',
        color: 'text-emerald-400'
    },
    {
        title: 'Music Bot',
        description: 'High-quality Lo-Fi beats to study to. Control the vibe of your study session.',
        icon: '🎵',
        color: 'text-cyan-400'
    },
    {
        title: 'Study Streaks',
        description: 'Maintain your daily streak to unlock exclusive roles and badges.',
        icon: '🔥',
        color: 'text-orange-400'
    },
    {
        title: 'Private Rooms',
        description: 'Create your own temporary voice channels for group study or solo focus.',
        icon: '🔒',
        color: 'text-pink-400'
    }
];

export default function Features() {
    return (
        <section id="features" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
                        ARSENAL & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">TOOLS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to gamify your study habits and stay consistent.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-lg bg-white/5 text-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-display mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
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
