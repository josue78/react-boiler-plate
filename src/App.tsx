import { useTranslation } from "react-i18next";
import { AppShell } from "./layout/components/AppShell";
import { TabProvider } from "./shared/context/TabContext";
import {
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconUser,
  IconShield,
  IconPresentation,
} from "@tabler/icons-react";
import type { MenuItem } from "./layout/types/menu.types";

function App() {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: t("menu.dashboard"),
      icon: IconLayoutDashboard,
      componentId: "dashboard",
    },
    {
      id: "users",
      label: t("menu.users"),
      icon: IconUsers,
      children: [
        {
          id: "users-list",
          label: t("menu.usersList"),
          componentId: "users-list",
        },
        {
          id: "users-create",
          label: t("menu.usersCreate"),
          componentId: "users-create",
        },
      ],
    },
    {
      id: "presentation",
      label: t("menu.presentation"),
      icon: IconPresentation,
      componentId: "presentation",
    },
    {
      id: "settings",
      label: t("menu.settings"),
      icon: IconSettings,
      children: [
        {
          id: "settings-profile",
          label: t("menu.profile"),
          icon: IconUser,
          componentId: "settings-profile",
        },
        {
          id: "settings-security",
          label: t("menu.security"),
          icon: IconShield,
          componentId: "settings-security",
        },
      ],
    },
  ];

  return (
    <TabProvider defaultComponentId="dashboard" defaultLabel={t("menu.dashboard")} defaultIcon={IconLayoutDashboard}>
      <AppShell menuItems={menuItems} />
    </TabProvider>
  );
}

export default App;
