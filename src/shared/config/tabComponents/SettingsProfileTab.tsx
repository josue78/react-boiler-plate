import { useTranslation } from 'react-i18next';

/**
 * Simple settings profile component.
 */
export function SettingsProfileTab() {
  const { t } = useTranslation();
  return <div>{t('menu.profile')}</div>;
}

