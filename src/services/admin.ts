import http from './http';

type Admin = {
  ID_NUM: number;
  ADMIN_ID: number;
  USER_NAME: string;
  EMAIL: string;
  SUPER_ADMIN: boolean;
};

const getAdmins = (): Promise<Admin[]> => http.get(`admins`);

const removeAdmin = (id: number): Promise<boolean> => http.del(`/admins/${id}`);

const addAdmin = (admin: Admin): Promise<Admin> => http.post(`/admins/`, admin);

const adminService = {
  getAdmins,
  removeAdmin,
  addAdmin,
};

export default adminService;
