import { useState, useRef } from 'react';

interface OptimisticUpdateParams<TState> {
  setOptimisticState: (currentState: TState) => TState;
  asyncAction: () => Promise<TState>;
}

export function useOptimisticUpdater<TState>(initialState: TState) {
  const [state, setState] = useState<TState>(initialState);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ! Race condition protection - ensures only latest operation updates state
  const operationIdRef = useRef(0);

  const runOptimisticUpdate = async ({
    setOptimisticState,
    asyncAction
  }: OptimisticUpdateParams<TState>) => {
    const currentOperationId = ++operationIdRef.current;

    let originalState: TState;

    // 1️⃣ Apply optimistic update immediately
    setState((currentState) => {
      originalState = currentState;
      return setOptimisticState(currentState);
    });

    setIsPending(true);

    // ? Should we update? Only if this is still the latest operation
    const shouldUpdate = () => currentOperationId === operationIdRef.current;

    try {
      // 2️⃣ Execute async action
      const result = await asyncAction();

      // 3️⃣ Update only if this is still the latest operation
      if (shouldUpdate()) {
        setState(result);
        setError(null);
      }
    } catch (err) {
      // 4️⃣ Rollback if this is still the latest operation
      if (shouldUpdate()) {
        setState(originalState!);
        setError(err as Error);
      }
    } finally {
      if (shouldUpdate()) {
        setIsPending(false);
      }
    }
  };

  return { state, isPending, error, runOptimisticUpdate };
}
