import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center glass-panel border-none rounded-none bg-opacity-50">
            <div className="text-2xl font-bold text-gradient">The Study Adda</div>
            <div className="flex gap-8">
                <a href="#hero" className="text-white hover:text-purple-300 transition-colors">Home</a>
                <a href="#factions" className="text-white hover:text-purple-300 transition-colors">Factions</a>
                <a href="#features" className="text-white hover:text-purple-300 transition-colors">Features</a>
                <a href="#clubs" className="text-white hover:text-purple-300 transition-colors">Clubs</a>
            </div>
            <a href="https://discord.gg/Yzjfp6QHPe" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all shadow-lg hover:shadow-purple-500/50">
                Join Discord
            </a>
        </nav>
    );
}
