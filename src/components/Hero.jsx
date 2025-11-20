import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-left"
                >
                    <div className="inline-block px-4 py-2 mb-6 rounded-full border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md">
                        <span className="text-accent-purple font-mono text-sm tracking-wider">🚀 JOIN THE MISSION</span>
                    </div>

                    <h1 className="font-display text-7xl md:text-9xl font-bold mb-6 leading-tight tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white animate-pulse">
                            THE STUDY
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-cosmic-gradient drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            ADDA
                        </span>
                    </h1>

                    <p className="font-sans text-xl md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed border-l-4 border-accent-cyan pl-6">
                        Compete, learn, and ascend in a gamified universe. Your study journey begins here.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <a href="https://discord.gg/Yzjfp6QHPe" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-white text-black font-bold font-display tracking-wider rounded-none skew-x-[-10deg] hover:bg-accent-cyan transition-colors duration-300">
                            <span className="block skew-x-[10deg]">START MISSION</span>
                            <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                        </a>
                    </div>
                </motion.div>

                {/* Spacer for 3D element */}
                <div className="hidden lg:block h-full min-h-[500px]"></div>
            </div>
        </section>
    );
}
