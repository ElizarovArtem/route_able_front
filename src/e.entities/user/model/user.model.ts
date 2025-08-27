export type User = {
  name?: string;
  email?: string;
  about?: string;
  phone: string;
  roles: Roles;
  isCoach: boolean;
  avatar?: string;
  id: string;
};

export enum Roles {
  Admin = 'Admin',
  Coach = 'Coach',
  Trainee = 'Trainee',
}
