import { BaseTheme, calculateThemeValues } from '../css/theme';

export function useTheme(theme?: Partial<BaseTheme>): ReturnType<typeof calculateThemeValues> {
  return calculateThemeValues(theme);
}
