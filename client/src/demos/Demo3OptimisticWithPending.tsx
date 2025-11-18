import { useOptimistic, useState, useTransition } from 'react';
import { DemoUI } from '../components/DemoUI';
import { catchPokemon } from '../api/pokemon';
import { CatchState } from '../types';
import { getOptimisticState, sync, handleCatchError } from '../utils/catchHandlers';
import { useDelay } from '../contexts/DelayContext';
import styles from '../styles/demo.module.css';

const initialState: CatchState = {
  caught: false,
  status: 'idle',
};

export function Demo3ReactHook() {
  const [actualState, setActualState] = useState<CatchState>(initialState);
  const { delay } = useDelay();

  const [isPending, startTransition] = useTransition();

  const [optimisticState, setOptimisticState] = useOptimistic(
    actualState,
    (state, newState: Partial<CatchState>) => ({
      ...state,
      ...newState,
    })
  );

  const handleThrow = (ballType: 'pokeball' | 'masterball') => {
    startTransition(async () => {
      // 1️⃣ Optimistic update (both balls show catching with wiggle)
      setOptimisticState(getOptimisticState(ballType, true));

      try {
        // 2️⃣ Server validates in background
        const result = await catchPokemon(ballType, delay);

        // 3️⃣ Sync actual state with server response
        sync(setActualState, result, ballType);
      } catch (error) {
        // 4️⃣ Rollback if server fails
        handleCatchError(setActualState, error);
      }
    });
  };

  const handleThrowPokeball = () => handleThrow('pokeball');
  // const handleThrowMasterball = () => handleThrow('masterball');
  const handleReset = () => setActualState(initialState);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demo 3: Optimistic (With Pending)</h1>
      <DemoUI
        state={optimisticState}
        onThrowPokeball={handleThrowPokeball}
        // onThrowMasterball={handleThrowMasterball}
        handleReset={handleReset}
        showWiggle={isPending}
      />
    </div>
  );
}
