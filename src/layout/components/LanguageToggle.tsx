import { ActionIcon, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage } from '@tabler/icons-react';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLanguage);
  };

  const currentLanguage = i18n.language === 'es' ? 'ES' : 'EN';

  return (
    <Tooltip label={`${t('common.toggleLanguage')} (${currentLanguage})`}>
      <ActionIcon
        variant="default"
        size="lg"
        aria-label={t('common.toggleLanguage')}
        onClick={toggleLanguage}
        style={{ transition: 'transform 0.2s' }}
        data-tour="language-toggle"
      >
        <IconLanguage size={18} />
      </ActionIcon>
    </Tooltip>
  );
}

