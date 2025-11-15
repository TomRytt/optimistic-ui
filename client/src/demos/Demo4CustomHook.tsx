import { DemoUI } from '../components/DemoUI';
import { catchPokemon } from '../api/pokemon';
import { useOptimisticUpdater } from '../hooks/useOptimisticUpdater';
import { CatchState } from '../types';
import { getOptimisticState, getCatchResultState } from '../utils/catchHandlers';
import { useDelay } from '../contexts/DelayContext';
import styles from '../styles/demo.module.css';

const initialState: CatchState = {
  caught: false,
  status: 'idle',
};

export function Demo4CustomHook() {
  const { state, isPending, runOptimisticUpdate } = useOptimisticUpdater<CatchState>(initialState);
  const { delay } = useDelay();

  const handleThrow = (ballType: 'pokeball' | 'masterball') => {
    runOptimisticUpdate({
      // 1️⃣ Optimistic update (both balls show catching with wiggle)
      setOptimisticState: (prev) => ({ ...prev, ...getOptimisticState(ballType, true) }),

      // 2️⃣ Server validates in background
      asyncAction: async () => {
        const result = await catchPokemon(ballType, delay);

        // 3️⃣ Return final state
        return getCatchResultState(result, ballType);
      },
    });
  };

  const handleThrowPokeball = () => handleThrow('pokeball');
  const handleThrowMasterball = () => handleThrow('masterball');
  const handleReset = () =>
    runOptimisticUpdate({
      setOptimisticState: () => initialState,
      asyncAction: async () => initialState,
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demo 4: Custom Hook</h1>
      <DemoUI
        state={state}
        onThrowPokeball={handleThrowPokeball}
        onThrowMasterball={handleThrowMasterball}
        handleReset={handleReset}
        showWiggle={isPending}
      />
    </div>
  );
}
