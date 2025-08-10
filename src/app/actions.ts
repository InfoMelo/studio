'use server';

import { smartSearch } from '@/ai/flows/smart-search';
import { servicesData, doctorsData } from '@/lib/data';

export async function handleSmartSearch(query: string): Promise<string[]> {
  const availableOptions = [...doctorsData.map(d => d.name), ...servicesData.map(s => s.name)];

  if (!query.trim()) {
    return doctorsData.map(d => d.id);
  }

  try {
    const aiResponse = await smartSearch({ query, availableOptions });
    if (aiResponse && aiResponse.results) {
      const matchedDoctorNames = new Set(aiResponse.results.filter(r => doctorsData.some(d => d.name === r)));
      const filteredDoctors = doctorsData.filter(d => matchedDoctorNames.has(d.name));
      return filteredDoctors.map(d => d.id);
    }
  } catch (error) {
    console.error('Smart search failed, falling back to simple search:', error);
  }

  // Fallback to simple search
  const lowerCaseQuery = query.toLowerCase();
  return doctorsData.filter(d => 
    d.name.toLowerCase().includes(lowerCaseQuery) ||
    d.specialty.toLowerCase().includes(lowerCaseQuery)
  ).map(d => d.id);
}
