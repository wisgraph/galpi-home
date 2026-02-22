import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

const directionOffsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: true,
        margin: '-50px 0px -50px 0px'
    });

    const offset = directionOffsets[direction];

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...offset
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0
            } : {}}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
