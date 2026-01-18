import { useState, useEffect } from 'react';

export default function TimeTravelDebug({ onTimeChange }) {
    const [isVisible, setIsVisible] = useState(false);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Expose secret command
        window.revealTimeTravel = (code) => {
            if (code === 'dGltZXRyYXZlbA==') { // 'timetravel' in base64
                setIsVisible(true);
                console.log("🕵️ Time Travel Enabled!");
            } else {
                console.log("❌ Access Denied");
            }
        };

        return () => {
            delete window.revealTimeTravel;
        };
    }, []);

    const handleTravel = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/dev/set-time', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ date: date || null }) // null resets time
            });
            const data = await res.json();
            alert(data.message);
            onTimeChange(); // Refresh parent
        } catch (err) {
            alert("Failed to travel time");
        }
        setLoading(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-red-900/80 p-4 rounded-lg border border-red-500 z-50 text-xs">
            <h4 className="font-bold text-red-200 mb-2">🕵️ Time Travel (Dev)</h4>
            <div className="flex gap-2">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-black/50 text-white border border-red-500/30 rounded px-2"
                />
                <button
                    onClick={handleTravel}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                >
                    {loading ? '...' : 'Go'}
                </button>
                <button
                    onClick={() => { setDate(''); handleTravel(); }}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
