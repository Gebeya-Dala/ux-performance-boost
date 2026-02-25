import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                LUX<span className="text-blue-500">ESTATE</span>
              </span>
            </div>
            <p className="mb-10 text-lg leading-relaxed text-slate-400">
              Redefining luxury living through curated property collections and exceptional concierge-style service. Your vision of the perfect home, realized.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center bg-slate-900 rounded-2xl text-slate-300 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-8">Explore</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Buy Property</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Sell Property</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Rentals</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Commercial</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Mortgage Tool</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-8">Company</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Meet the Team</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-lg mb-8">Exclusive Updates</h4>
            <p className="mb-6 font-medium">Be the first to know about new listings and market reports.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-900 border-slate-800 rounded-2xl py-5 pl-6 pr-16 focus:ring-2 focus:ring-blue-600 focus:bg-slate-800 outline-none transition-all placeholder:text-slate-600 text-white font-bold"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 px-4 rounded-xl hover:bg-blue-500 transition-all group-hover:shadow-lg group-hover:shadow-blue-600/20">
                <ArrowRight size={20} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} LuxEstate Global Realty. All rights reserved.</p>
          <div className="flex gap-10 text-sm font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};