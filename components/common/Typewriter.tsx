import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
    cursorClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
    text: fullText,
    typingSpeed = 150,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = "",
    cursorClassName = ""
}) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let currentIdx = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (!isDeleting) {
                setDisplayText(fullText.slice(0, currentIdx + 1));
                currentIdx++;

                if (currentIdx === fullText.length) {
                    timeoutId = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, pauseDuration);
                    return;
                }
            } else {
                setDisplayText(fullText.slice(0, currentIdx - 1));
                currentIdx--;

                if (currentIdx === 0) {
                    isDeleting = false;
                }
            }

            const speed = isDeleting ? deletingSpeed : typingSpeed;
            timeoutId = setTimeout(type, speed);
        };

        timeoutId = setTimeout(type, 500);
        return () => clearTimeout(timeoutId);
    }, [fullText, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <div className={`flex items-center justify-center gap-1 min-h-[1.5em] ${className}`}>
            {displayText}
            <span className={`w-0.5 h-5 bg-current animate-pulse ${cursorClassName}`} />
        </div>
    );
};

export default Typewriter;
