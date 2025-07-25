'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import Login from './Login';
import { Button } from './ui/button';

export default function IntroSlideshow() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showSlideshow, setShowSlideshow] = useState(true);
    const [exitAnimation, setExitAnimation] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mapRevealPercent, setMapRevealPercent] = useState(100);
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
        '/prologue/1.jpg',
        '/prologue/2.jpg',
        '/prologue/3.jpg',
        '/prologue/4.jpg',
        '/prologue/5.jpg',
        '/prologue/6.jpg',
        '/prologue/7.jpg',
        '/prologue/8.jpg',
        '/prologue/9.jpg',
        '/prologue/10.jpg',
        '/prologue/11.jpg',
        '/prologue/12.jpg',
        '/prologue/13.jpg',
        '/prologue/14.jpg',
        '/prologue/15.jpg',
        '/prologue/16.jpg',
        '/prologue/17.jpg',
        '/prologue/18.jpg',
        '/prologue/19.jpg',
        '/prologue/20.jpg'
    ];

    const nextPage = () => {
        if (isTransitioning || currentPage >= images.length - 1) return;

        setIsTransitioning(true);
        setMapRevealPercent(0);

        setTimeout(() => {
            setCurrentPage(prev => prev + 1);

            // Animate the reveal of the new map
            const revealAnimation = setInterval(() => {
                setMapRevealPercent(prev => {
                    if (prev >= 100) {
                        clearInterval(revealAnimation);
                        setIsTransitioning(false);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 20);
        }, 300);
    };

    const prevPage = () => {
        if (isTransitioning || currentPage <= 0) return;

        setIsTransitioning(true);
        setMapRevealPercent(0);

        setTimeout(() => {
            setCurrentPage(prev => prev - 1);

            // Animate the reveal of the new map
            const revealAnimation = setInterval(() => {
                setMapRevealPercent(prev => {
                    if (prev >= 100) {
                        clearInterval(revealAnimation);
                        setIsTransitioning(false);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 20);
        }, 300);
    };

    const goToPage = (index) => {
        if (isTransitioning || index === currentPage) return;

        setIsTransitioning(true);
        setMapRevealPercent(0);

        setTimeout(() => {
            setCurrentPage(index);

            // Animate the reveal of the new map
            const revealAnimation = setInterval(() => {
                setMapRevealPercent(prev => {
                    if (prev >= 100) {
                        clearInterval(revealAnimation);
                        setIsTransitioning(false);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 20);
        }, 300);
    };

    const handleSkip = () => {
        setExitAnimation(true);
        setTimeout(() => {
            setShowSlideshow(false);
        }, 500); // Match this with the CSS transition duration
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextPage();
            } else if (e.key === 'ArrowLeft') {
                prevPage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage, isTransitioning]);

    // Handle swipe gestures
    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left, go to next page
                nextPage();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right, go to previous page
                prevPage();
            }
        };

        const mapElement = document.getElementById('prologue-container');
        if (mapElement) {
            mapElement.addEventListener('touchstart', handleTouchStart, { passive: true });
            mapElement.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        return () => {
            if (mapElement) {
                mapElement.removeEventListener('touchstart', handleTouchStart);
                mapElement.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [currentPage, isTransitioning]);

    if (!showSlideshow) {
        return <Login />;
    }

    return (
        <div className={`fixed bg-black inset-0 w-screen h-screen overflow-hidden transition-opacity duration-500 ${exitAnimation ? 'opacity-0' : 'opacity-100'}`} id="prologue-container">
            {/* Skip button - Positioned at top-right corner */}
            <div className="absolute top-3 right-3 z-50">
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

            {/* Map Image */}
            <div
                className="absolute flex p-1 flex-col justify-center inset-0 z-0 transition-all duration-500 ease-out"
                style={{
                    clipPath: `polygon(
                        0% 0%, 
                        ${mapRevealPercent}% 0%, 
                        ${mapRevealPercent}% 100%, 
                        0% 100%
                    )`,
                    boxShadow: isTransitioning ? '5px 0 15px rgba(0,0,0,0.3)' : 'none'
                }}
            >
                <Image
                    src={images[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    sizes="100vw"
                    width={100}
                    height={100}
                    cover
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    priority={true}
                    className="transition-transform duration-300 w-[100vw] rounded-sm"
                />
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-10">
                <Button
                    onClick={prevPage}
                    disabled={currentPage === 0 || isTransitioning}
                    className={`rounded-full p-2 ${currentPage === 0 || isTransitioning ? 'bg-slate-700/50 text-slate-400' : 'bg-amber-800/80 hover:bg-amber-700/80 text-amber-100'
                        } transition-all duration-200 map-button`}
                    size="icon"
                >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous Page</span>
                </Button>

                <div className="text-center text-amber-100/90 text-sm font-bold bg-amber-900/50 px-3 py-1 rounded-full">
                    Page {currentPage + 1} of {images.length}
                </div>

                <Button
                    onClick={nextPage}
                    disabled={currentPage === images.length - 1 || isTransitioning}
                    className={`rounded-full p-2 ${currentPage === images.length - 1 || isTransitioning ? 'bg-slate-700/50 text-slate-400' : 'bg-amber-800/80 hover:bg-amber-700/80 text-amber-100'
                        } transition-all duration-200 map-button`}
                    size="icon"
                >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next Page</span>
                </Button>
            </div>

        </div>
    );
}