'use server';

import { smartSearch } from '@/ai/flows/smart-search';
import { doctorsData, servicesData } from '@/lib/data';
import type { Doctor } from '@/lib/types';

export async function handleSmartSearch(query: string): Promise<{ correctedQuery: string; results: string[] }> {
  if (!query.trim()) {
    return { correctedQuery: '', results: doctorsData.map(d => d.id) };
  }

  const doctorNames = doctorsData.map(d => d.name);
  const serviceNames = servicesData.map(s => s.name);
  const availableOptions = [...new Set([...doctorNames, ...serviceNames])];

  try {
    const aiResponse = await smartSearch({ query, availableOptions });
    
    const matchedDoctorNames = new Set(aiResponse.results.filter(r => doctorNames.includes(r)));
    const filteredDoctors = doctorsData.filter(d => matchedDoctorNames.has(d.name));
    
    // If AI returns nothing, maybe do a fallback search
    if (filteredDoctors.length > 0) {
      return {
        correctedQuery: aiResponse.correctedQuery,
        results: filteredDoctors.map(d => d.id),
      };
    }
  } catch (error) {
    console.error('Smart search failed:', error);
  }

  // Fallback to simple search if AI fails or returns no matches
  const lowerCaseQuery = query.toLowerCase();
  const fallbackDoctors = doctorsData.filter(d => 
      d.name.toLowerCase().includes(lowerCaseQuery) ||
      d.specialty.toLowerCase().includes(lowerCaseQuery)
  );
  return {
    correctedQuery: query,
    results: fallbackDoctors.map(d => d.id),
  };
}
