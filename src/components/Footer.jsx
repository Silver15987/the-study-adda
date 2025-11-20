export default function Footer() {
    return (
        <footer className="w-full py-8 bg-black/50 text-center text-gray-400 backdrop-blur-md border-t border-white/10">
            <p>&copy; 2025 The Study Adda. All rights reserved.</p>
            <p className="text-sm mt-2">Designed and Developed by <a href="https://www.pratiman.in" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">Pratiman Joshi</a></p>
            <div className="flex justify-center gap-4 mt-4">
                <a href="https://discord.gg/Yzjfp6QHPe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
                <a href="https://www.reddit.com/r/TheStudyAdda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Reddit</a>
                <a href="https://www.instagram.com/the.study.adda_official?utm_source=qr&igsh=Y3g1bHFwZThqNDc3" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
        </footer>
    );
}
