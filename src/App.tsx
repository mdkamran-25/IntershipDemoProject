import React, { useState, useEffect } from 'react';
import { Beer } from './types/Beer';
import { fetchBeers } from './services/api';
import SearchBar from './components/SearchBar';
import BeerGrid from './components/BeerGrid';
import { Beer as BeerIcon } from 'lucide-react';

function App() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBeers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting to fetch beers...');
        const data = await fetchBeers();
        console.log('Successfully fetched beers, count:', data.length);
        setBeers(data);
        setFilteredBeers(data);
      } catch (err) {
        console.error('Error in App component:', err);
        setError('Failed to fetch beers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getBeers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBeers(beers);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = beers.filter(beer => 
        beer.name.toLowerCase().includes(lowercaseSearch) ||
        (beer.description && beer.description.toLowerCase().includes(lowercaseSearch))
      );
      setFilteredBeers(filtered);
    }
  }, [searchTerm, beers]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Debug output
  console.log('Render state:', { 
    beersCount: beers.length, 
    filteredCount: filteredBeers.length, 
    isLoading, 
    hasError: !!error 
  });

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BeerIcon className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Beer Explorer</h1>
            </div>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {isLoading ? 'Loading beers...' : 
             error ? 'Error' : 
             `Showing ${filteredBeers.length} ${filteredBeers.length === 1 ? 'beer' : 'beers'}`}
          </h2>
          {!isLoading && !error && searchTerm && (
            <p className="text-gray-600">
              Search results for: <span className="font-medium">"{searchTerm}"</span>
            </p>
          )}
        </div>

        <BeerGrid 
          beers={filteredBeers} 
          isLoading={isLoading} 
          error={error} 
        />
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Data provided by Sample APIs - Beer Collection</p>
        </div>
      </footer>
    </div>
  );
}

export default App;