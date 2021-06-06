export interface StateError {
  isError: boolean;
  errorMessage: string;
  isCustom?: boolean;
}

export const createStateError = (errorMessage: string, isCustom?: boolean): StateError => ({ isError: true, errorMessage, isCustom });
