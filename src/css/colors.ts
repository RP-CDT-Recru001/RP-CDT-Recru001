export type ColorScheme = typeof colorsDefinition;
export type FontColorScheme = typeof fontColorDefinition;

export type ColorDef = keyof ColorScheme;
export type FontColorDef = keyof FontColorScheme;

export const fontColorDefinition = {
  PRIMARY: '#EFEFEF',
  SECONDARY: 'blue'
};

export const colorsDefinition = {
  PRIMARY: '#EFEFEF',
  SECONDARY: '#EFEFEF',
  FRAMING: 'silver',
  ACTIVE: '#d3d3d3',
  HOVER: 'silver',
  SUCCESS: 'green',
  WARNING: 'orange',
  ERROR: 'red',
  NONE: 'transparent',
  BACKGROUND_MIN: '#485563',
  BACKGROUND_MAX: '#29323c'
};

export const color = (type?: ColorDef): string => colorsDefinition[type || 'PRIMARY'];
export const fontColor = (type?: FontColorDef): string => fontColorDefinition[type || 'PRIMARY'];
