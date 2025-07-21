export type TUser = {
  name?: string;
  email?: string;
  note?: string;
  phone: string;
  role: Roles;
  id: string;
};

export enum Roles {
  Admin = 'Admin',
  Coach = 'Coach',
  Trainee = 'Trainee',
}
