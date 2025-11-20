export default function Footer() {
    return (
        <footer className="w-full py-8 bg-black/50 text-center text-gray-400 backdrop-blur-md border-t border-white/10">
            <p>&copy; 2024 The Study Adda. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">Discord</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
        </footer>
    );
}
