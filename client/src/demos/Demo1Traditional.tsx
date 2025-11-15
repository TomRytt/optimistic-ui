import { useState } from 'react';
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

export function Demo1Traditional() {
  const [state, setState] = useState<CatchState>(initialState);
  const { delay } = useDelay();

  // ! PROBLEM: User has to wait - no instant feedback
  const handleThrow = async (ballType: 'pokeball' | 'masterball') => {
    setState({ caught: false, status: 'catching', currentBall: ballType });

    try {
      // * Server takes configured delay...
      const result = await catchPokemon(ballType, delay);

      // * Finally show result
      sync(setState, result, ballType);
    } catch (error) {
      handleCatchError(setState, error);
    }
  };

  const handleThrowPokeball = () => handleThrow('pokeball');
  const handleThrowMasterball = () => handleThrow('masterball');
  const handleReset = () => setState(initialState);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demo 1: Traditional</h1>
      <DemoUI
        state={state}
        onThrowPokeball={handleThrowPokeball}
        onThrowMasterball={handleThrowMasterball}
        handleReset={handleReset}
        showSpinner={true}
        disableWhenNotIdle={true}
      />
    </div>
  );
}
