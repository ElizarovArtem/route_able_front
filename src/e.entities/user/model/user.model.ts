export type User = {
  name?: string;
  email: string;
  about?: string;
  phone?: string;
  roles: Roles;
  isCoach: boolean;
  avatar?: string;
  id: string;
  height?: string;
  weight?: string;
  isCoachAgreed?: boolean;
};

export enum Roles {
  Admin = 'Admin',
  Coach = 'Coach',
  Client = 'Client',
}
