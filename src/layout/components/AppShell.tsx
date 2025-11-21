import {
  AppShell as MantineAppShell,
  Group,
  ActionIcon,
  Tooltip,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHelp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { TabsContainer } from "./TabsContainer";
import { useTour } from "../../shared/hooks/useTour";
import type { MenuItem } from "../types/menu.types";

interface AppShellProps {
  menuItems: MenuItem[];
}

export function AppShell({ menuItems }: AppShellProps) {
  const { startTour } = useTour();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <MantineAppShell
      navbar={{
        width: opened ? 280 : 0,
        breakpoint: "sm",
      }}
      header={{
        height: 60,
      }}
    >
      <MantineAppShell.Navbar
        style={{
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <Sidebar menuItems={menuItems} onClose={toggle} opened={opened} />
      </MantineAppShell.Navbar>
      <MantineAppShell.Header p={0} data-tour="header">
        {/* Accent bar at the top */}
        <Box
          style={{
            height: "3px",
            backgroundColor: theme.colors.primary[6],
            width: "100%",
          }}
        />

        {/* Header content */}
        <Group justify="space-between" h="100%" p="md">
          <Logo height={32} />
          <Group gap="xs">
            <Tooltip label={t("header.startTour")}>
              <ActionIcon
                variant="default"
                size="lg"
                aria-label={t("header.startTourAria")}
                onClick={startTour}
              >
                <IconHelp size={18} />
              </ActionIcon>
            </Tooltip>
            <LanguageToggle />
            <ThemeToggle />
          </Group>
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Main
        style={{
          transition: "margin-left 0.3s ease-in-out",
          height: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TabsContainer />
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
