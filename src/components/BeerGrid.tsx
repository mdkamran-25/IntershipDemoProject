import React from 'react';
import { Beer } from '../types/Beer';
import BeerCard from './BeerCard';

interface BeerGridProps {
  beers: Beer[];
  isLoading: boolean;
  error: string | null;
}

const BeerGrid: React.FC<BeerGridProps> = ({ beers, isLoading, error }) => {
  console.log('BeerGrid props:', { beersCount: beers.length, isLoading, error });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="ml-3 text-amber-800">Loading beers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-lg mb-2">Error loading beers</div>
        <p className="text-gray-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (beers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">No beers found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {beers.map((beer) => (
        <BeerCard key={beer.id} beer={beer} />
      ))}
    </div>
  );
};

export default BeerGrid;