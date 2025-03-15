'use client';
import { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from "react-pageflip";
import Image from 'next/image';
import { ArrowBigLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Login from './Login';

export default function MyBook() {
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

    const nextPage = () => {
        if (bookRef.current && currentPage < images.length - 1) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (bookRef.current && currentPage > 0) {
            bookRef.current.pageFlip().flipPrev();
        }
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
    const bookHeight = dimensions.height * 0.85; // Increased from 0.8 to 0.9

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${exitAnimation ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                {/* Skip button in top right corner */}
                <button
                    onClick={handleSkip}
                    className="absolute top-4 right-4 z-10 bg-amber-800 hover:bg-amber-600 text-white rounded-full p-2 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                    <X className="h-5 w-5" />
                    <span className="absolute right-full mr-2 bg-amber-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">Skip</span>
                </button>

                {/* Flipbook container with shadow */}
                <div className="relative shadow-2xl rounded-lg overflow-hidden">
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
                            <div key={index} className="relative h-full w-full bg-amber-100">
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
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                    <p className="text-white text-sm font-medium">Page {index + 1}</p>
                                </div>
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>

                {/* Navigation controls overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center space-x-4 px-4">
                    <button
                        onClick={prevPage}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${currentPage === 0
                            ? 'bg-gray-200/70 text-gray-400 cursor-not-allowed'
                            : 'bg-amber-800/70 text-white hover:bg-amber-600/90 hover:scale-110'
                            }`}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={nextPage}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${currentPage === images.length - 1
                            ? 'bg-gray-200/70 text-gray-400 cursor-not-allowed'
                            : 'bg-amber-800/70 text-white hover:bg-amber-600/90 hover:scale-110'
                            }`}
                        disabled={currentPage === images.length - 1}
                    >
                       <ChevronRight/>
                    </button>
                </div>
            </div>
        </div>
    );
}