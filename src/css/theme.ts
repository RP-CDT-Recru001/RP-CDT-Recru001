import { DefaultTheme } from 'styled-components';
import { color, ColorDef, fontColor, FontColorDef } from './colors';
import { size, SizeDef } from './sizes';

export interface BaseTheme {
  colorSheme: ColorDef;
  sizeScheme: SizeDef;
  textColorScheme: FontColorDef;
}

// type SimpleCssProps<Type> = {
//   [Property in keyof Type]: string;
// };

export const calculateThemeValues = (themeOpts?: Partial<BaseTheme>): DefaultTheme => {
  return {
    size: size(themeOpts?.sizeScheme),
    color: color(themeOpts?.colorSheme),
    fontColor: fontColor(themeOpts?.textColorScheme)
  };
};
