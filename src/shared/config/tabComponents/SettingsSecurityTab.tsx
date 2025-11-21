import { useTranslation } from 'react-i18next';

/**
 * Simple settings security component.
 */
export function SettingsSecurityTab() {
  const { t } = useTranslation();
  return <div>{t('menu.security')}</div>;
}

