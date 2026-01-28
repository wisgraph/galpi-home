import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import PersonaTabsCarousel from '../components/PersonaTabsCarousel';
import HowItWorks from '../components/HowItWorks';
import TechDeepDive from '../components/TechDeepDive';
import ComparisonTable from '../components/ComparisonTable';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import useSmoothScroll from '../hooks/useSmoothScroll';


const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
};

const HomePage: React.FC = () => {
    // Apply smooth scrolling with Lenis + GSAP
    useSmoothScroll();

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Hero />
            <PersonaTabsCarousel />
            <HowItWorks />
            <TechDeepDive />
            <ComparisonTable />
            <Pricing />
            <FAQ />
        </motion.div>
    );
};

export default HomePage;
