import { resources } from '../../i18n';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];
  // eslint-disable-next-line
  interface Resources extends DefaultResources {}
}
