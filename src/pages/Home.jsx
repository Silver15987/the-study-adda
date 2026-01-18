import Hero from '../components/Hero';
import ConsistencyChallenge from '../components/challenge/ConsistencyChallenge';
import Features from '../components/Features';
import HallOfFame from '../components/HallOfFame';
import Clubs from '../components/Clubs';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Hero />
            <ConsistencyChallenge />
            <Features />
            <HallOfFame />
            <Clubs />
            <Footer />
        </>
    );
}
