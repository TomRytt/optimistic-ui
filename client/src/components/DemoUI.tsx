import { CatchState } from '../types';
import { Buttons } from './Buttons';
import { Sprite } from './Sprite';
import { Spinner } from './Spinner';
import styles from '../styles/charizard.module.css';

interface CharizardUIProps {
  state: CatchState;
  handleReset: () => void;
  onThrowPokeball?: () => void;
  onThrowMasterball?: () => void;
  showSpinner?: boolean;
  showWiggle?: boolean;
  disableWhenNotIdle?: boolean;
}

export function DemoUI({
  state,
  onThrowPokeball,
  onThrowMasterball,
  handleReset,
  showSpinner = false,
  showWiggle = false,
  disableWhenNotIdle = false,
}: CharizardUIProps) {
  const getStatusText = () => {
    switch (state.status) {
      case 'idle':
        return 'Wild Charizard appeared!';
      case 'catching':
        return 'Catching...';
      case 'caught':
        return 'Charizard Caught!';
      case 'escaped':
        return 'Charizard Escaped!';
    }
  };

  const getStatusClass = () => {
    return `${styles.status} ${styles[state.status] || ''}`;
  };

  const shouldShowSpinner = showSpinner && state.status === 'catching';

  // For demos 1 and 2: disable unless idle
  // For all demos: disable while catching
  const shouldDisable = state.status === 'catching' || (disableWhenNotIdle && state.status !== 'idle');

  return (
    <>
      <div className={styles.charizardContainer}>
        {!shouldShowSpinner ? (
          <>
            <Sprite state={state} showWiggle={showWiggle} />

            <div className={getStatusClass()}>{getStatusText()}</div>
          </>
        ) : (
          <Spinner />
        )}
      </div>

      <Buttons
        onThrowPokeball={onThrowPokeball}
        onThrowMasterball={onThrowMasterball}
        disabled={shouldDisable}
        handleReset={handleReset}
        status={state.status}
      />
    </>
  );
}
