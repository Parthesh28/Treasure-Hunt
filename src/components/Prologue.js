'use client';
import { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from "react-pageflip";
import Image from 'next/image';
import { X, Map } from 'lucide-react';
import Login from './Login';

import { Button } from './ui/button';

export default function IntroSlideshow() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showFlipbook, setShowFlipbook] = useState(true);
    const [exitAnimation, setExitAnimation] = useState(false);
    const bookRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 800,
        height: typeof window !== 'undefined' ? window.innerHeight : 1200
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const images = [
        'https://picsum.photos/id/10/800/1200',
        'https://picsum.photos/id/11/800/1200',
        'https://picsum.photos/id/12/800/1200',
        'https://picsum.photos/id/13/800/1200',
        'https://picsum.photos/id/14/800/1200',
        'https://picsum.photos/id/15/800/1200',
        'https://picsum.photos/id/16/800/1200',
        'https://picsum.photos/id/17/800/1200',
        'https://picsum.photos/id/18/800/1200',
        'https://picsum.photos/id/19/800/1200',
    ];

    const handlePageFlip = (e) => {
        setCurrentPage(e.data);
    };

    const handleSkip = () => {
        setExitAnimation(true);
        setTimeout(() => {
            setShowFlipbook(false);
        }, 500); // Match this with the CSS transition duration
    };

    if (!showFlipbook) {
        return <Login />;
    }

    // Calculate appropriate book dimensions
    const bookWidth = dimensions.width > 1200 ? 800 : dimensions.width > 768 ? 650 : dimensions.width * 0.95;
    const bookHeight = dimensions.height * 0.85;

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${exitAnimation ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
                <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-amber-600/30 shadow-lg">
                    {/* Skip button - Repositioned to top-right corner of the book */}
                    <div className="absolute top-3 right-3 z-10">
                        <Button
                            onClick={handleSkip}
                            size="sm"
                            variant="ghost"
                            className="bg-slate-800/60 hover:bg-primary/80 text-white hover:text-white rounded-full h-8 px-3 flex items-center gap-1 transition-all duration-200 backdrop-blur-sm shadow-md"
                        >
                            <span className="text-xs font-medium">Skip</span>
                            <X className="h-3 w-3" />
                        </Button>
                    </div>

                    <HTMLFlipBook
                        width={bookWidth}
                        height={Math.min(bookHeight, dimensions.height * 0.95)}
                        size="stretch"
                        minWidth={dimensions.width * 0.9}
                        maxWidth={dimensions.width * 0.98}
                        minHeight={dimensions.height * 0.7}
                        maxHeight={dimensions.height * 0.95}
                        showCover={true}
                        className="mx-auto"
                        onFlip={handlePageFlip}
                        ref={bookRef}
                        flippingTime={1000}
                        usePortrait={true}
                        startPage={0}
                        drawShadow={true}
                        autoSize={true}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="relative h-full w-full">
                                <Image
                                    src={image}
                                    alt={`Page ${index + 1}`}
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                    priority={index <= 2}
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>

                {/* Page indicator dots */}
                <div className="flex gap-2 mt-4 justify-center">
                    {Array.from({ length: images.length }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === index
                                    ? "bg-accent scale-125 shadow-md shadow-accent/50"
                                    : "bg-blue-400/30"
                                }`}
                            aria-label={`Page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}