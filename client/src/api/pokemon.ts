import { CatchResponse } from '../types';

export async function catchPokemon(
  ballType: 'pokeball' | 'masterball',
  delay: number = 3
): Promise<CatchResponse> {
  const response = await fetch(`http://localhost:3001/api/catch/${ballType}?delay=${delay}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
}
