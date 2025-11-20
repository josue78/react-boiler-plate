import { config, debugLog } from '../../../shared/config/env';

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
    debugLog('Fetching dashboard data from:', config.apiUrl);
    
    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/dashboard`, {
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    
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
