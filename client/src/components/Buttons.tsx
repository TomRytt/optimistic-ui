import { Status } from '../types';
import { DelaySelector } from './DelaySelector';
import styles from '../styles/charizard.module.css';

interface ButtonsProps {
  onThrowPokeball?: () => void;
  onThrowMasterball?: () => void;
  handleReset: () => void;
  disabled?: boolean;
  status: Status;
}

export function Buttons({
  onThrowPokeball,
  onThrowMasterball,
  handleReset,
  disabled = false,
  status,
}: ButtonsProps) {
  const showResetButton = status === 'caught' || status === 'escaped';

  return (
    <>
      <div className={styles.buttons}>
        {onThrowPokeball && (
          <button
            className={`${styles.button} ${styles.pokeball}`}
            onClick={onThrowPokeball}
            disabled={disabled}
          >
            Throw Pokeball
          </button>
        )}

        {onThrowMasterball && (
          <button
            className={`${styles.button} ${styles.masterball}`}
            onClick={onThrowMasterball}
            disabled={disabled}
          >
            Throw Master Ball
          </button>
        )}
      </div>

      <div className={styles.resetContainer}>
        {showResetButton && (
          <button
            className={`${styles.button} ${styles.reset}`}
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        <DelaySelector />
      </div>
    </>
  );
}
