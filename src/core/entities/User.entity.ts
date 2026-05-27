export interface User {
  id?: number;
  nombre: string;
  correo: string;
  contrasena: string;
  profileImage?: string | null;
  createdAt?: string;
}