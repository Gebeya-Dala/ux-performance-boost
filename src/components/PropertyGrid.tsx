import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Search, SlidersHorizontal, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = ['All', 'Residential', 'Commercial', 'Villa', 'Penthouse', 'Cabin'];

  const filteredProperties = useMemo(() => {
    let result = properties.filter((p) => {
      const matchesCategory = filter === 'All' || p.type === filter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [properties, filter, searchQuery, sortBy]);

  return (
    <section className="py-24 bg-white" id="properties">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Exclusive Listings</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Discover Extraordinary Living</h2>
            <p className="text-slate-600 text-lg">
              Hand-picked properties from the world's most desirable locations. 
              Find your perfect home with our intelligent search tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search location, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600/30 transition-all outline-none text-slate-900 font-medium"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none w-full sm:w-48 pl-4 pr-10 py-4 rounded-2xl bg-slate-50 border-transparent font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
              >
                <option value="default">Sort By: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 overflow-x-auto pb-6 mb-12 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "whitespace-nowrap px-8 py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95",
                filter === cat
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/95 backdrop-blur shadow-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
                      {property.status}
                    </span>
                  </div>
                  
                  <button className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
                    <Heart className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-2xl font-black">{formatCurrency(property.price)}</span>
                    <button className="bg-white text-slate-900 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">{property.type}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Bed className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{property.beds} <span className="text-slate-400 font-medium">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Bath className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{property.baths} <span className="text-slate-400 font-medium">Baths</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Square className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{property.sqft} <span className="text-slate-400 font-medium">sqft</span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Mockup */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 transform hover:-translate-y-1">
            Browse All Properties
          </button>
        </div>

        {filteredProperties.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"
          >
            <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h4 className="text-2xl font-bold text-slate-900 mb-2">No Properties Found</h4>
            <p className="text-slate-500 max-w-sm mx-auto">
              We couldn't find any results matching your search criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="mt-8 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};