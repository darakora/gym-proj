import { type JwtToken, type UserProfile } from '../../entities/apiTypes';
import { type FETCH_STATUS } from '../../entities/fetchStatus';

const ConfirmState = {
  true: true,
  false: false
} as const;

export interface TokenError {
  message: string;
  statusCode: number;
  error: string;
}

export type ConfirmStates = (typeof ConfirmState)[keyof typeof ConfirmState];

export interface UserSlice {
  currentUser:
    | { status: typeof FETCH_STATUS.IDLE }
    | { status: typeof FETCH_STATUS.LOADING }
    | { status: typeof FETCH_STATUS.SUCCESS; data: UserProfile }
    | { status: typeof FETCH_STATUS.ERROR; error: string };
  tokens:
    | { status: typeof FETCH_STATUS.IDLE }
    | { status: typeof FETCH_STATUS.LOADING }
    | { status: typeof FETCH_STATUS.SUCCESS; data: JwtToken }
    | { status: typeof FETCH_STATUS.ERROR; error: TokenError };
}

export interface CreateTokenPayload {
  email: string;
  password: string;
}
