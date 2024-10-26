import { Locale } from './config';

import enMessages from './messages/en';
import esMessages from './messages/es';
import ptMessages from './messages/pt';

export type Messages = typeof enMessages;

const messages: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
};

export default messages;