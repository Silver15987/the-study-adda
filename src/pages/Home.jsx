import Hero from '../components/Hero';
import FactionShowcase from '../components/FactionShowcase';
import Features from '../components/Features';
import HallOfFame from '../components/HallOfFame';
import Clubs from '../components/Clubs';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Hero />
            <FactionShowcase />
            <Features />
            <HallOfFame />
            <Clubs />
            <Footer />
        </>
    );
}
