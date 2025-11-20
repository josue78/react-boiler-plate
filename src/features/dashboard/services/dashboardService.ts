export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: string[];
}

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    // Simulación de llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: {
            totalUsers: 1234,
            totalRevenue: 45678,
            totalOrders: 890,
            growthRate: 12.5,
          },
          recentActivity: [
            'Nuevo usuario registrado',
            'Orden #1234 completada',
            'Pago procesado',
            'Usuario actualizado',
          ],
        });
      }, 500);
    });
  },
};
