'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import Login from './Login';
import { Button } from './ui/button';
import Winner from './Winner';
export default function WinnerPrologue({data}) {
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
        '/conclusion/1.jpg',
        '/conclusion/2.jpg',
        '/conclusion/3.jpg',
        '/conclusion/4.jpg',
        '/conclusion/5.jpg',
        '/conclusion/6.jpg',
        '/conclusion/7.jpg',
        '/conclusion/8.jpg',
        '/conclusion/9.jpg',
        '/conclusion/10.jpg',
        '/conclusion/11.jpg',
        '/conclusion/12.jpg',
        '/conclusion/13.jpg',
        '/conclusion/14.jpg',
        '/conclusion/15.jpg',
        '/conclusion/16.jpg',
        '/conclusion/17.jpg',
        '/conclusion/18.jpg',
        '/conclusion/19.jpg',
        '/conclusion/20.jpg',
        "/END.png"
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

    if (currentPage === 20) {
        return <Winner data={data}/>
    }

    return (
        <div className={`fixed bg-black inset-0 w-screen h-screen overflow-hidden transition-opacity duration-500 ${exitAnimation ? 'opacity-0' : 'opacity-100'}`} id="prologue-container">

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
                    className="transition-transform duration-300 w-[100vw] rounded-lg"
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
                    Page {currentPage + 1} of {images.length - 1}
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