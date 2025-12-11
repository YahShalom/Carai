import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage';
import { Link } from 'react-router-dom';
import { ARTWORK_DATA } from '../constants';
import { ArtworkCategory } from '../types';
import { ArrowLeft, Palette, X, ZoomIn, Filter } from 'lucide-react';
import SEO from './SEO';

const ArtworkPage: React.FC = () => {
  const [filter, setFilter] = useState<ArtworkCategory>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: ArtworkCategory[] = ['All', 'Ads', 'Logos', 'Signs', 'Product Labels', 'Flyers/Banners'];

  const filteredArtwork = filter === 'All' 
    ? ARTWORK_DATA 
    : ARTWORK_DATA.filter(item => item.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20">
            <SEO
                title="Artwork & Design | Carai Agency"
                description="Explore our creative design work including logos, ads, product labels, and brand identity projects."
                url="https://carai.agency/artwork"
                breadcrumbs={[
                    { name: 'Home', url: 'https://carai.agency' },
                    { name: 'Artwork', url: 'https://carai.agency/artwork' }
                ]}
            />
      {/* Header Image */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg mb-20"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2609&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-navy-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        
        {/* Animated geometric overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Palette className="w-6 h-6 text-gold-400" />
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Creative Studio</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Graphic Designs
                </h1>
                <p className="mt-4 text-xl text-silver-300 max-w-2xl font-light">
                    Graphic design & branding services: From identity design to high-impact advertising materials.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12 justify-center md:justify-start">
            <div className="flex items-center gap-2 mr-4 text-navy-400 dark:text-silver-500 font-bold uppercase tracking-wider text-sm">
                <Filter className="w-4 h-4" /> Filter:
            </div>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        filter === cat
                        ? 'bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20 scale-105'
                        : 'bg-white dark:bg-navy-800 text-navy-600 dark:text-silver-400 hover:bg-silver-100 dark:hover:bg-navy-700 border border-gold-400/10'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtwork.map((item, idx) => (
                <div 
                    key={item.id}
                    className="group relative bg-white dark:bg-navy-800 rounded-3xl overflow-hidden shadow-xl border-2 border-gold-400/10 hover:border-gold-400/50 transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(item.imageUrl)}>
                        <LazyImage
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <ZoomIn className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                        <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-sm text-gold-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/30">
                            {item.category}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-navy-600 dark:text-silver-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>

        {filteredArtwork.length === 0 && (
            <div className="text-center py-20 text-navy-500 dark:text-silver-500">
                <p className="text-xl">No artwork found in this category.</p>
                <button 
                    onClick={() => setFilter('All')}
                    className="mt-4 text-gold-500 font-bold hover:underline"
                >
                    View All Categories
                </button>
            </div>
        )}

      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
        >
            <button 
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
            >
                <X className="w-8 h-8" />
            </button>
            <div 
                className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <LazyImage
                    src={selectedImage || ''}
                    alt="Artwork Preview"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkPage;