import Hero from '../components/Hero';
import Leaderboard from '../components/Leaderboard';
import MembersOfNote from '../components/MembersOfNote';
import HallOfFame from '../components/HallOfFame';
import Events from '../components/Events';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Hero />
            <Leaderboard />
            <MembersOfNote />
            <HallOfFame />
            <Events />
            <Footer />
        </>
    );
}
