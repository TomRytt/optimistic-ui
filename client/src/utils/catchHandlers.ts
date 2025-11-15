import { BallType, CatchState, CatchResponse } from '../types';

/**
 * Resets state to idle after a delay
 */
export function reset(
  setState: (state: CatchState) => void,
): void {
  setState({ caught: false, status: 'idle', currentBall: null });
}

/**
 * Handles catch errors by resetting state and logging
 */
export function handleCatchError(
  setState: (state: CatchState) => void,
  error: unknown
): void {
  setState({ caught: false, status: 'idle', currentBall: null });
  console.error('Failed:', error);
}

/**
 * Common pattern for processing catch results into state
 */
export function getCatchResultState(
  result: CatchResponse,
  ballType: BallType
): CatchState {
  return {
    caught: result.success,
    status: result.success ? 'caught' : 'escaped',
    currentBall: null,
    caughtWithBall: result.success ? ballType : null,
  };
}

/**
 * Determines optimistic state based on ball type
 * @param ballType - Type of ball being thrown
 * @param showCatchingForAll - If true, show catching state for both balls (demos 3 & 4)
 */
export function getOptimisticState(
  ballType: BallType,
  showCatchingForAll: boolean = false
): Partial<CatchState> {
  if (showCatchingForAll) {
    // Demos 3 & 4: Always show catching state with wiggle
    return { caught: false, status: 'catching', currentBall: ballType };
  } else if (ballType === 'masterball') {
    // Demo 2: Masterball shows instant success
    return { caught: true, status: 'caught', caughtWithBall: ballType };
  } else {
    // Pokeball: show catching state
    return { caught: false, status: 'catching', currentBall: ballType };
  }
}

/**
 * Syncs with server response and schedules reset
 * Combines getCatchResultState + resetAfterDelay
 */
export function sync(
  setState: (state: CatchState) => void,
  result: CatchResponse,
  ballType: BallType
): void {
  setState(getCatchResultState(result, ballType));
}
