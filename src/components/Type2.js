import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { ScanQrCode, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Type2({ data, handleSubmit, windowSize }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mapRevealPercent, setMapRevealPercent] = useState(100);

  async function readCode() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!answer) return;

    await handleSubmit(answer);
  }

  const nextPage = () => {
    if (isTransitioning || currentPage >= data.images.length - 1) return;

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

  // A4 aspect ratio is 1:√2 (approximately 1:1.414)
  const calculateA4Dimensions = () => {
    // Use full screen dimensions with no margin
    const screenWidth = windowSize?.width || window.innerWidth || 1200;
    const screenHeight = windowSize?.height || window.innerHeight || 800;

    return { width: screenWidth, height: screenHeight };
  };

  const a4Dimensions = calculateA4Dimensions();

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

    const mapElement = document.getElementById('map-container-type2');
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

  return (
    <div className="fixed bg-black/50 backdrop-blur-md inset-0 w-screen h-screen overflow-hidden" id="map-container-type2">
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
          src={data.images[currentPage]}
          alt={`Map ${currentPage + 1}`}
          sizes="100vw"
          width={100}
          height={100}
          cover
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority={true}
          className="transition-transform duration-300 w-[100vw]"
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
          <span className="sr-only">Previous Map</span>
        </Button>

        <div className="text-center text-amber-100/90 text-sm font-bold bg-amber-900/50 px-3 py-1 rounded-full">
          Image {currentPage + 1} of {data?.images?.length || 0}
        </div>

        <Button
          onClick={nextPage}
          disabled={currentPage === data.images.length - 1 || isTransitioning}
          className={`rounded-full p-2 ${currentPage === data.images.length - 1 || isTransitioning ? 'bg-slate-700/50 text-slate-400' : 'bg-amber-800/80 hover:bg-amber-700/80 text-amber-100'
            } transition-all duration-200 map-button`}
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next Map</span>
        </Button>
      </div>

      {/* Floating Scan QR Code Button */}
      <div className="fixed bottom-8 right-6 z-50">
        <Button
          onClick={readCode}
          size="icon"
          className="bg-primary hover:bg-primary/80 text-white h-14 w-14 rounded-full shadow-lg shadow-blue-900/50 transition-all duration-200 ease-in-out transform hover:scale-105 border-2 border-blue-300/30 animate-pulse-glow"
        >
          <ScanQrCode className="h-7 w-7" />
          <span className="sr-only">Scan QR Code</span>
        </Button>
      </div>
    </div>
  );
}