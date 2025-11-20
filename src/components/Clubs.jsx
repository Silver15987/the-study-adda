import { motion } from 'framer-motion';

const clubs = [
    {
        name: "Arts × Humanities",
        icon: "🎨",
        desc: "Where the deep thinkers, doodlers, poetry at 3 AM people, and “I promise this is not a philosophy spiral” crowd hang out. If you love stories, history rabbit holes, aesthetic Pinterest boards, or debating whether art is real, this is your cozy corner.",
        color: "from-pink-500 to-rose-500"
    },
    {
        name: "Business × Finance",
        icon: "💼",
        desc: "For the ones who see a meme and think “How do I monetize this”. From entrepreneurship to economics, if you enjoy strategy, management, or breaking down Fortune 500 case studies at midnight, this club is your boardroom.",
        color: "from-amber-400 to-orange-600"
    },
    {
        name: "Health × Wellness",
        icon: "🍁",
        desc: "Calm energy only. Breathe in. Breathe out. Hydrate. Stretch. Whether you are into mental health, fitness routines, lifestyle tips, or just trying to sleep before 3 AM for once, welcome to the wellness sanctuary.",
        color: "from-emerald-400 to-teal-600"
    },
    {
        name: "Recreation × Entertainment",
        icon: "🕹️",
        desc: "Your fun zone filled with gaming sessions, movie suggestions, travel plans, hobby dumping, and everything you do to escape life’s chaos for a bit. Absolutely zero productivity required.",
        color: "from-purple-500 to-indigo-600"
    },
    {
        name: "Science × Technology",
        icon: "⚡",
        desc: "For the geeks, engineers, code warriors, and “wait, let me explain this with a diagram” people. If you enjoy tinkering, experimenting, debugging life, or asking “but why”, this club will feel like home.",
        color: "from-cyan-400 to-blue-600"
    },
    {
        name: "Social × Sciences",
        icon: "🔍",
        desc: "The place for psychology enthusiasts, sociology deep dives, political debates that stay civil, and the anthropology nerd squad. Come for the insight, stay for the “humans are wild” conversations.",
        color: "from-red-400 to-pink-600"
    },
    {
        name: "Book Log",
        icon: "📚",
        desc: "A cozy nook for readers of all types including speed readers, vibe readers, manga enjoyers, and people who buy books faster than they read them. Share your favorites, discover new ones, and pretend your TBR pile is not judging you.",
        color: "from-yellow-400 to-amber-500"
    },
    {
        name: "Football Club",
        icon: "⚽",
        desc: "For lovers of the beautiful game including match discussions, transfer drama, GOAT debates, memes, predictions, live reactions, and friendly fan wars. Whether you are Messi, Ronaldo, or simply watching for the vibes, you are welcome on the pitch.",
        color: "from-green-500 to-emerald-700"
    }
];

export default function Clubs() {
    return (
        <section id="clubs" className="py-20 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
                        OUR COMMUNITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">CLUBS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Find your tribe. Connect with like-minded individuals in our specialized interest clubs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clubs.map((club, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20 overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${club.color} opacity-10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>

                            <div className="relative z-10 flex items-start gap-6">
                                <div className="text-4xl bg-white/5 p-4 rounded-xl border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {club.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white font-display mb-3 group-hover:text-purple-300 transition-colors">
                                        {club.name}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {club.desc}
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
