/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Config } from './domain/types';
import { CountryCode } from './domain/urls';
import { Locale } from './domain/flags';

let config = {};
try {
  /* eslint-disable-next-line */
  config = require('../config.json');
} catch (err) {
  console.log('No config file found....fallback to env/defaults');
}

/**
 * The values in this file are just fallback values, in case someone forgets to update
 * the config in production when new config fields are added.
 * This file should not be modified, only add new fallback values when a new config
 * field is added
 * */
const fallbackConfig: Config = {
  BASE_URL: process.env.BASE_URL || 'coronastatus.no',
  COUNTRY_CODE: (process.env.COUNTRY_CODE as CountryCode) || 'no',
  DB_PATH: process.env.DB_PATH || './covid_db',
  LOCALE: (process.env.LOCALE as Locale) || 'en-US',
  MAP_CENTER: process.env.MAP_CENTER || '10.7522, 63.9139',
  MAP_ZOOM: parseInt(process.env.MAP_ZOOM || '4', 10),
  MAP_MAX_ZOOM: parseInt(process.env.MAP_MAX_ZOOM || '13', 10),
  PASSCODE_LENGTH: parseInt(process.env.PASSCODE_LENGTH || '4', 10),
  RATE_LIMIT_COUNT: parseInt(process.env.RATE_LIMIT_COUNT || '20', 10), // allowed number of reports from a single IP during a time window
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '86400000', 10), // rate limit window in miliseconds
  REDIRECT_TO_GOVERNMENT:
    process.env.REDIRECT_TO_GOVERNMENT === 'true' || false,
  SUPPORTED_LOCALES: [(process.env.LOCALE as Locale) || 'en-US'],
  THOUSAND_SEPARATOR: process.env.THOUSAND_SEPARATOR || ' ',
  ZIP_GUIDE: process.env.ZIP_GUIDE === 'true' || false,
  ZIP_PATTERN: process.env.ZIP_PATTERN || '[A-Za-z0-9-]{2,10}', // Fallback to very general pattern in case it is missing in the config
  ZIP_PLACEHOLDER: process.env.ZIP_PLACEHOLDER || '1234'
};

// @ts-ignore
if (!config.ZIP_PATTERN && config.ZIP_LENGTH) {
  // @ts-ignore
  fallbackConfig.ZIP_PATTERN = `[A-Za-z0-9]{${config.ZIP_LENGTH}}`;
}

export default {
  ...fallbackConfig,
  ...config
};
