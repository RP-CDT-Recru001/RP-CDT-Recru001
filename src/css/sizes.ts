export type SizingScheme = typeof sizeDefinition;

export type SizeDef = keyof SizingScheme;

//all over the place, proto
export const sizeDefinition = {
  XL: 32,
  L: 20,
  MD: 14,
  SM: 12,
  XS: 9,
  XXS: 7,
  DEFAULT_FONT_SIZE: 14,
  MARGIN_BASE: 8
};

export const px = (value: number, unit: 'em' | 'rem' = 'rem'): string => `${(value / sizeDefinition.DEFAULT_FONT_SIZE).toString()}${unit}`;

export const size = (type?: SizeDef): string => px(sizeDefinition[type || 'DEFAULT_FONT_SIZE']);
