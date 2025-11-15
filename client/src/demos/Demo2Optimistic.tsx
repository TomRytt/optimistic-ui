import { useOptimistic, useState, useTransition } from 'react';
import { DemoUI } from '../components/DemoUI';
import { catchPokemon } from '../api/pokemon';
import { CatchState } from '../types';
import { sync, handleCatchError } from '../utils/catchHandlers';
import { useDelay } from '../contexts/DelayContext';
import styles from '../styles/demo.module.css';

const initialState: CatchState = {
  caught: false,
  status: 'idle',
};

export function Demo2Optimistic() {
  const [actualState, setActualState] = useState<CatchState>(initialState);
  const { delay } = useDelay();

  // start transition for pending state
  const [, startTransition] = useTransition();

  // use optimistic state for instant UI updates
  const [optimisticState, setOptimisticState] = useOptimistic(
    actualState,
    (state, newState: Partial<CatchState>) => ({
      ...state,
      ...newState,
    })
  );

  // ! SOLUTION: Update UI instantly - assume success
  const handleThrow = (ballType: 'pokeball' | 'masterball') => {
    startTransition(async () => {
      // 1️⃣ Optimistic update - instant success
      setOptimisticState({ caught: true, status: 'caught', caughtWithBall: ballType });

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
  const handleThrowMasterball = () => handleThrow('masterball');
  const handleReset = () => setActualState(initialState);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demo 2: Optimistic</h1>
      <DemoUI
        state={optimisticState}
        onThrowPokeball={handleThrowPokeball}
        onThrowMasterball={handleThrowMasterball}
        handleReset={handleReset}
        disableWhenNotIdle={true}
      />
    </div>
  );
}
