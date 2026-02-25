import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { CarouselItem } from '../types';

interface HeroCarouselProps {
  items: CarouselItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-slate-900 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={items[currentIndex].image}
            alt={items[currentIndex].title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4"
            >
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Premium Selection
              </span>
            </motion.div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-7xl font-extrabold text-white mb-6 max-w-5xl leading-[1.1]"
            >
              {items[currentIndex].title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl font-light"
            >
              {items[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
              >
                Explore Property
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold transition-all border border-white/30"
              >
                Contact Agent
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        aria-label="Previous Slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-blue-600 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden lg:flex items-center justify-center border border-white/10"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        aria-label="Next Slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-blue-600 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden lg:flex items-center justify-center border border-white/10"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Pagination Progress */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              currentIndex === idx ? 'bg-blue-600 w-12' : 'bg-white/30 w-6 hover:bg-white/60'
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};