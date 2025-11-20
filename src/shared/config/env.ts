/**
 * Environment Configuration Module
 * 
 * Centralized configuration based on the current environment.
 * All environment variables should be accessed through this module.
 */

type Environment = 'development' | 'staging' | 'production';

interface AppConfig {
  apiUrl: string;
  appName: string;
  appVersion: string;
  enableDebug: boolean;
  apiTimeout: number;
  environment: Environment;
}

/**
 * Gets the current environment from Vite
 */
function getEnvironment(): Environment {
  const mode = import.meta.env.MODE;
  
  if (mode === 'production') {
    return 'production';
  }
  if (mode === 'staging') {
    return 'staging';
  }
  return 'development';
}

/**
 * Validates that a required environment variable exists
 */
function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value
 */
function getEnv(key: string, defaultValue: string): string {
  return import.meta.env[key] || defaultValue;
}

/**
 * Gets a boolean environment variable
 */
function getBooleanEnv(key: string, defaultValue: boolean): boolean {
  const value = import.meta.env[key];
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return value === 'true' || value === '1';
}

/**
 * Gets a number environment variable
 */
function getNumberEnv(key: string, defaultValue: number): number {
  const value = import.meta.env[key];
  if (!value) {
    return defaultValue;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Application configuration object
 * All environment variables are validated and typed here
 */
export const config: AppConfig = {
  apiUrl: requireEnv('VITE_API_URL'),
  appName: getEnv('VITE_APP_NAME', 'React Boiler Plate'),
  appVersion: getEnv('VITE_APP_VERSION', '0.0.0'),
  enableDebug: getBooleanEnv('VITE_ENABLE_DEBUG', false),
  apiTimeout: getNumberEnv('VITE_API_TIMEOUT', 30000),
  environment: getEnvironment(),
};

/**
 * Type-safe access to configuration
 */
export type { AppConfig, Environment };

/**
 * Helper function to check if we're in development
 */
export const isDevelopment = (): boolean => config.environment === 'development';

/**
 * Helper function to check if we're in staging
 */
export const isStaging = (): boolean => config.environment === 'staging';

/**
 * Helper function to check if we're in production
 */
export const isProduction = (): boolean => config.environment === 'production';

/**
 * Debug logger that only logs when debug is enabled
 */
export const debugLog = (...args: unknown[]): void => {
  if (config.enableDebug) {
    console.log(`[${config.environment}]`, ...args);
  }
};

