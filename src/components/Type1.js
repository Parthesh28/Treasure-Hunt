import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import {  Map, ScanQrCode, SwipeRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

export default function Type1({ data, handleSubmit }) {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);

  async function readCode() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!answer) return;

    // todo: add try-catch for error handling
    await handleSubmit(answer);
  }

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    if (bookRef.current && currentPage < data.images.length - 1) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

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

  const bookWidth = dimensions.width > 1200 ? 800 : dimensions.width > 768 ? 650 : dimensions.width * 0.95;
  const bookHeight = dimensions.height * 0.80;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full px-4 py-6 md:px-6 md:py-8">
      <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
        <div className="relative shadow-2xl rounded-md overflow-hidden mb-6">
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
            {data.images.map((image, index) => (
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

        {/* Page indicator dots - Fixed positioning */}
        <div className="flex gap-2 justify-center mt-2 mb-4">
          {Array.from({ length: data?.images?.length || 0 }).map((_, index) => (
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

      {/* Floating Scan QR Code Button */}
      <div className="fixed bottom-8 right-6 z-50">
        <Button
          onClick={readCode}
          size="icon"
          className="bg-primary hover:bg-primary/80 text-white h-14 w-14 rounded-full shadow-lg shadow-blue-900/50 transition-all duration-200 ease-in-out transform hover:scale-105 border-2 border-blue-300/30"
        >
          <ScanQrCode className="h-7 w-7" />
          <span className="sr-only">Scan QR Code</span>
        </Button>
      </div>

      {/* Floating Map Button with Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="fixed bottom-8 left-6 z-50">
            <Button
              size="icon"
              className="bg-accent hover:bg-accent/80 text-accent-foreground h-14 w-14 rounded-full shadow-lg shadow-amber-900/50 transition-all duration-200 ease-in-out transform hover:scale-105 border-2 border-amber-300/30"
            >
              <Map className="h-7 w-7" />
              <span className="sr-only">View Map</span>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="pirate-dialog overflow-hidden max-w-md w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-blue-100 font-bold text-xl">Treasure Map</DialogTitle>
            <DialogDescription className="text-blue-200">Navigate your journey through the seven seas</DialogDescription>
          </DialogHeader>
          <div className="relative overflow-hidden rounded-lg border-2 border-amber-600/30 shadow-inner animate-pulse-glow">
            <Image
              src="/map.png"
              alt="Map of the treasure"
              width={500}
              height={400}
              className="w-full h-auto rounded-md object-cover"
              priority={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
