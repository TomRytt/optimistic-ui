export type Status = 'idle' | 'catching' | 'caught' | 'escaped';
export type BallType = 'pokeball' | 'masterball' | null;

export interface CatchState {
  caught: boolean;
  status: Status;
  currentBall?: BallType;
  caughtWithBall?: BallType; // Track which ball successfully caught the Pokemon
}

export interface CatchResponse {
  success: boolean;
  message: string;
}
