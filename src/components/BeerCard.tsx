import React from 'react';
import { Beer } from '../types/Beer';
import { Star } from 'lucide-react';

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  console.log('Rendering BeerCard:', beer.name);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-amber-50">
        {beer.image ? (
          <img 
            src={beer.image} 
            alt={beer.name} 
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              console.log('Image failed to load, using fallback for:', beer.name);
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
            }}
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Default beer" 
            className="w-full h-full object-contain p-2"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{beer.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm text-gray-600">
            {beer.rating?.average || 'N/A'} 
            {beer.rating?.reviews && <span className="text-xs text-gray-500 ml-1">({beer.rating.reviews} reviews)</span>}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>ABV: {beer.abv || 'N/A'}%</span>
          <span>IBU: {beer.ibu || 'N/A'}</span>
        </div>
        <div className="text-right mt-2">
          <span className="font-bold text-amber-600">{beer.price || 'Price N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;