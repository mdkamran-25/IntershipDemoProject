import { Beer } from '../types/Beer';

const API_URL = 'https://api.sampleapis.com/beers/ale';

export const fetchBeers = async (): Promise<Beer[]> => {
  try {
    console.log('Fetching beers from API...');
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched beers:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching beers:', error);
    throw error;
  }
};