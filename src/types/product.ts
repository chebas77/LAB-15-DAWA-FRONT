export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  categoria?: string;
  categoryId?: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
