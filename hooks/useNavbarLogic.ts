import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarLogic = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mobile Menu Logic
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Visibility Logic
    // Homepage: 2.5s delay (initially false), others: immediate (initially true)
    const [isVisible, setIsVisible] = useState(!isHome);

    useEffect(() => {
        if (isHome) {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [isHome]);

    return {
        isScrolled,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isVisible,
        location
    };
};
