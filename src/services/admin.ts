import http from './http';

type AdminView = {
  Username: string;
  Email: string;
  IsSuperAdmin: boolean;
};

const getAdmins = (): Promise<AdminView[]> => http.get(`admins`);

const removeAdmin = (username: string): Promise<boolean> => http.del(`admins/${username}`);

const addAdmin = (admin: AdminView): Promise<AdminView> => http.post(`admins`, admin);

const adminService = {
  getAdmins,
  removeAdmin,
  addAdmin,
};

export default adminService;
