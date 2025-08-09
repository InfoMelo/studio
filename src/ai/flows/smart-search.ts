'use server';
/**
 * @fileOverview Implements a smart search flow that leverages an LLM to understand
 * misspellings and colloquial terms for searching doctors and services.
 *
 * - smartSearch - A function that handles the smart search process.
 * - SmartSearchInput - The input type for the smartSearch function.
 * - SmartSearchOutput - The return type for the smartSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSearchInputSchema = z.object({
  query: z.string().describe('The user search query.'),
  availableOptions: z.array(z.string()).describe('The list of available doctor names and services.'),
});
export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;

const SmartSearchOutputSchema = z.object({
  correctedQuery: z.string().describe('The corrected or understood query.'),
  results: z.array(z.string()).describe('The search results based on the corrected query.'),
});
export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

export async function smartSearch(input: SmartSearchInput): Promise<SmartSearchOutput> {
  return smartSearchFlow(input);
}

const smartSearchPrompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: {schema: SmartSearchInputSchema},
  output: {schema: SmartSearchOutputSchema},
  prompt: `You are a search assistant that understands misspellings and colloquial terms.

  The user is searching for doctors and services using the query: {{{query}}}
  Here are the available options: {{{availableOptions}}}

  Based on the user's query, identify the most relevant options from the available options.
  Correct any misspellings or understand any colloquial terms in the query.

  Return the corrected query and the search results as a JSON object.
  Ensure that the search results array only contains elements that are present in availableOptions.
  `,
});

const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async input => {
    const {output} = await smartSearchPrompt(input);
    return output!;
  }
);
