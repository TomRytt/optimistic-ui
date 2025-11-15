import { useDelay } from '../contexts/DelayContext';
import styles from '../styles/charizard.module.css';

export function DelaySelector() {
  const { delay, setDelay } = useDelay();

  return (
    <div className={styles.delaySelector}>
      <label htmlFor="delay">Delay: </label>
      <select
        id="delay"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        className={styles.delaySelect}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
  );
}
