import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Float, Stage, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Import Trophy Assets
import trophy1 from '../assets/Clash_of_Kingdoms_Trophy2-1.png';
import trophy2 from '../assets/Hogwarts_X_TSA.png';
import trophy3 from '../assets/Kings_Domain_2.png';
import trophy4 from '../assets/Mecha_Overlord_Trophy.png';
import trophy5 from '../assets/The_Divergent_Vanguards.png';

const records = [
    { title: "Clash of Kingdoms", holder: "KingdomKeeper", value: "Winner", date: "Oct 2024", img: trophy1, color: "from-yellow-500 to-red-600" },
    { title: "Hogwarts x TSA", holder: "WizardOne", value: "Champion", date: "Sept 2024", img: trophy2, color: "from-purple-600 to-blue-600" },
    { title: "Kings Domain", holder: "RoyalGuard", value: "Victor", date: "Aug 2024", img: trophy3, color: "from-amber-400 to-orange-600" },
    { title: "Mecha Overlord", holder: "TechGiant", value: "Supreme", date: "July 2024", img: trophy4, color: "from-cyan-400 to-blue-500" },
    { title: "Divergent Vanguards", holder: "PathFinder", value: "Elite", date: "June 2024", img: trophy5, color: "from-emerald-400 to-green-600" },
];

function TrophyModel({ img }) {
    const texture = useTexture(img);
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
                <planeGeometry args={[3, 3]} />
                <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} emissive={0xffffff} emissiveIntensity={0.1} />
            </mesh>
        </Float>
    );
}

export default function HallOfFame() {
    const [selectedTrophy, setSelectedTrophy] = useState(null);

    return (
        <section id="hall-of-fame" className="py-32 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                        TROPHY CASE
                    </h2>
                    <p className="text-gray-400 text-lg font-sans tracking-wide">Click a trophy to inspect it in 3D</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {records.map((record, index) => (
                        <motion.div
                            key={index}
                            layoutId={`card-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedTrophy(record)}
                            className="relative group cursor-pointer"
                        >
                            <div className={`absolute -inset-1 bg-gradient-to-r ${record.color} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                            <div className="relative bg-[#0a0a0a] ring-1 ring-white/10 rounded-3xl p-8 h-full flex flex-col items-center text-center overflow-hidden hover:bg-white/5 transition-colors">

                                <div className="w-48 h-48 mb-6 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <img src={record.img} alt={record.title} className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                                </div>

                                <h3 className="font-display text-xl font-bold text-white mb-2 uppercase tracking-wider">{record.title}</h3>
                                <div className={`text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${record.color} mb-4`}>
                                    {record.value}
                                </div>

                                <div className="mt-auto w-full border-t border-white/10 pt-4">
                                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">HELD BY</p>
                                    <p className="text-white font-bold text-lg">{record.holder}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3D Inspection Modal */}
                <AnimatePresence>
                    {selectedTrophy && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                            onClick={() => setSelectedTrophy(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative w-full max-w-4xl h-[80vh] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedTrophy(null)}
                                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                >
                                    ✕
                                </button>

                                {/* Info Overlay */}
                                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                                    <h2 className="font-display text-4xl font-bold text-white mb-2">{selectedTrophy.title}</h2>
                                    <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${selectedTrophy.color}`}>
                                        {selectedTrophy.holder} • {selectedTrophy.date}
                                    </p>
                                </div>

                                {/* 3D Canvas */}
                                <div className="w-full h-full cursor-move">
                                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                        <color attach="background" args={['#050505']} />
                                        <ambientLight intensity={1} />
                                        <pointLight position={[10, 10, 10]} intensity={2} />
                                        <pointLight position={[-10, -10, -10]} intensity={1} color="blue" />
                                        <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

                                        <Suspense fallback={null}>
                                            <Stage environment={null} intensity={0.5}>
                                                <TrophyModel img={selectedTrophy.img} />
                                            </Stage>
                                        </Suspense>

                                        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} minDistance={3} maxDistance={10} />
                                    </Canvas>
                                </div>

                                <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
                                    <p className="text-gray-500 text-sm font-mono">DRAG TO ROTATE • SCROLL TO ZOOM</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
