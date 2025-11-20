import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function useTour() {
  const { t, i18n } = useTranslation();
  const driverObj = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    if (driverObj.current) {
      driverObj.current.destroy();
    }

    driverObj.current = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '[data-tour="sidebar"]',
          popover: {
            title: t('tour.sidebar.title'),
            description: t('tour.sidebar.description'),
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '[data-tour="header"]',
          popover: {
            title: t('tour.header.title'),
            description: t('tour.header.description'),
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour="theme-toggle"]',
          popover: {
            title: t('tour.themeToggle.title'),
            description: t('tour.themeToggle.description'),
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '[data-tour="dashboard-cards"]',
          popover: {
            title: t('tour.dashboardCards.title'),
            description: t('tour.dashboardCards.description'),
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour="recent-activity"]',
          popover: {
            title: t('tour.recentActivity.title'),
            description: t('tour.recentActivity.description'),
            side: 'top',
            align: 'start',
          },
        },
      ],
    });

    return () => {
      if (driverObj.current) {
        driverObj.current.destroy();
      }
    };
  }, [t, i18n.language]);

  const startTour = () => {
    if (driverObj.current) {
      driverObj.current.drive();
    }
  };

  return { startTour };
}

