import { useState, useRef } from 'react';

interface OptimisticUpdateParams<TState> {
  setOptimisticState: (currentState: TState) => TState;
  asyncAction: () => Promise<TState>;
}

export function useOptimisticUpdater<TState>(initialState: TState) {
  const [state, setState] = useState<TState>(initialState);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const runOptimisticUpdate = async ({
    setOptimisticState,
    asyncAction,
  }: OptimisticUpdateParams<TState>) => {
    let originalState: TState;

    // 1️⃣ Apply optimistic update immediately
    setState((currentState) => {
      originalState = currentState;
      return setOptimisticState(currentState);
    });

    setIsPending(true);

    try {
      // 2️⃣ Execute async action
      const result = await asyncAction();
      // 3️⃣ Update only if this is still the latest operation
      setState(result);
      setError(null);
    } catch (err) {
      // 4️⃣ Rollback if this is still the latest operation
      setState(originalState!);
      setError(err as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { state, isPending, error, runOptimisticUpdate };
}
