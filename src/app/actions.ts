'use server';

import { smartSearch } from '@/ai/flows/smart-search';
import { servicesData } from '@/lib/data';
import { getDoctors } from '@/app/admin/actions';
import type { Doctor } from '@/lib/types';

export async function handleSmartSearch(query: string): Promise<{ correctedQuery: string; results: string[] }> {
  const doctors = await getDoctors();
  
  if (!query.trim()) {
    return { correctedQuery: '', results: doctors.map(d => d.id) };
  }

  const doctorNames = doctors.map(d => d.name);
  const serviceNames = servicesData.map(s => s.name);
  const availableOptions = [...new Set([...doctorNames, ...serviceNames])];
  let aiFailed = false;

  try {
    const aiResponse = await smartSearch({ query, availableOptions });
    
    // Check if AI response yields any valid doctors
    if (aiResponse && aiResponse.results.length > 0) {
      const matchedDoctorNames = new Set(aiResponse.results.filter(r => doctorNames.includes(r)));
      const filteredDoctors = doctors.filter(d => matchedDoctorNames.has(d.name));
      
      if (filteredDoctors.length > 0) {
        return {
          correctedQuery: aiResponse.correctedQuery,
          results: filteredDoctors.map(d => d.id),
        };
      }
    }
  } catch (error) {
    console.error('Smart search failed, falling back to simple search:', error);
    aiFailed = true;
  }

  // Fallback to simple search if AI fails or returns no valid matches
  const lowerCaseQuery = query.toLowerCase();
  const fallbackDoctors = doctors.filter(d => 
      d.name.toLowerCase().includes(lowerCaseQuery) ||
      d.specialty.toLowerCase().includes(lowerCaseQuery)
  );
  
  return {
    correctedQuery: query, // Return original query on fallback
    results: fallbackDoctors.map(d => d.id),
  };
}
