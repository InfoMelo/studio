
'use server';

import { smartSearch, SmartSearchOutput } from '@/ai/flows/smart-search';
import { getDoctors, getServices } from './admin/actions';

export async function handleSmartSearch(query: string): Promise<SmartSearchOutput> {
  const doctors = await getDoctors();
  const services = await getServices();
  
  const availableOptions = [...doctors.map(d => d.name), ...services.map(s => s.name)];

  if (!query.trim()) {
    return {
      correctedQuery: '',
      results: doctors.map(d => d.docId || ''),
    };
  }

  try {
    const aiResponse = await smartSearch({ query, availableOptions });
    if (aiResponse && aiResponse.results) {
      const matchedDoctorIds = new Set<string>();
      const matchedServiceNames = new Set<string>();

      aiResponse.results.forEach(result => {
        const matchingDoctor = doctors.find(d => d.name === result);
        if (matchingDoctor && matchingDoctor.docId) {
          matchedDoctorIds.add(matchingDoctor.docId);
        }
        
        const matchingService = services.find(s => s.name === result);
        if (matchingService) {
          matchedServiceNames.add(matchingService.name);
        }
      });
      
      // If a service was matched, find doctors of that specialty (service name === specialty)
      if (matchedServiceNames.size > 0) {
        const doctorsInSpecialty = doctors.filter(d => matchedServiceNames.has(d.specialty));
        doctorsInSpecialty.forEach(d => d.docId && matchedDoctorIds.add(d.docId));
      }

      return {
        correctedQuery: aiResponse.correctedQuery,
        results: Array.from(matchedDoctorIds),
      };
    }
  } catch (error) {
    console.error('Smart search failed, falling back to simple search:', error);
  }

  // Fallback to simple search
  const lowerCaseQuery = query.toLowerCase();
  const fallbackResults = doctors.filter(d => 
    d.name.toLowerCase().includes(lowerCaseQuery) ||
    d.specialty.toLowerCase().includes(lowerCaseQuery)
  ).map(d => d.docId || '');

  return {
    correctedQuery: query,
    results: fallbackResults,
  };
}
