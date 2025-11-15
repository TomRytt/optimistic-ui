import { CatchState } from '../types';
import styles from '../styles/charizard.module.css';
import charizardImg from '../assets/charizard.png';
import pokeballImg from '../assets/pokeball.png';
import masterballImg from '../assets/masterball.png';

interface SpriteProps {
  state: CatchState;
  showWiggle?: boolean;
}

export function Sprite({ state, showWiggle = false }: SpriteProps) {
  const getSpriteImage = () => {
    // Show the ball during catching
    if (state.status === 'catching' && state.currentBall) {
      return state.currentBall === 'pokeball' ? pokeballImg : masterballImg;
    }

    // Show the ball that caught Charizard when caught
    if (state.status === 'caught' && state.caughtWithBall) {
      return state.caughtWithBall === 'pokeball' ? pokeballImg : masterballImg;
    }

    // Otherwise show Charizard
    return charizardImg;
  };

  const shouldWiggle = () => {
    return showWiggle && state.status === 'catching' && state.currentBall === 'pokeball';
  };

  return (
    <div className={styles.spriteContainer}>
      <img
        src={getSpriteImage()}
        alt="Pokemon"
        className={`${styles.sprite} ${shouldWiggle() ? styles.wiggle : ''}`}
      />
    </div>
  );
}
