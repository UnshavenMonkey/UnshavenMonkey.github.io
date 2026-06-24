import { API_BASE_URL } from './signup';

export interface AuthResult {
  token: string;
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface ServerProfile {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  commandId: string;
}

export interface ServerCategory {
  id: string;
  name: string;
}

export interface ServerProduct {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  category: ServerCategory;
}

export interface ProductListResponse {
  data: ServerProduct[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
}

export interface CategoryListResponse {
  data: ServerCategory[];
}

export interface ProductPayload {
  name: string;
  desc: string;
  photo: string;
  price: number;
  categoryId: string;
}

export interface CreateOrderPayload {
  products: Array<{
    id: string;
    quantity: number;
  }>;
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

export class ApiError extends Error {
  payload: unknown;

  constructor(payload: unknown) {
    super('API request failed');
    this.payload = payload;
  }
}

const request = async <T>(path: string, { token, headers, ...options }: RequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(data);
  }

  return data;
};

const stringifyParam = (value: unknown) => JSON.stringify(value);

export const signIn = (body: SignInBody) =>
  request<AuthResult>('/signin', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getProfile = (token: string) => request<ServerProfile>('/profile', { token });

export const updateProfile = (token: string, name: string) =>
  request<ServerProfile>('/profile', {
    method: 'PATCH',
    token,
    body: JSON.stringify({ name }),
  });

export const getProducts = (pageNumber: number, pageSize = 8, token?: string | null) => {
  const params = new URLSearchParams({
    pagination: stringifyParam({ pageNumber, pageSize }),
    sorting: stringifyParam({ type: 'DESC', field: 'createdAt' }),
  });

  return request<ProductListResponse>(`/products?${params.toString()}`, { token });
};

export const getCategories = (token?: string | null) => request<CategoryListResponse>('/categories', { token });

export const createCategory = (token: string, name: string) =>
  request<ServerCategory>('/categories', {
    method: 'POST',
    token,
    body: JSON.stringify({ name }),
  });

export const createProduct = (token: string, body: ProductPayload) =>
  request<ServerProduct>('/products', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });

export const updateProduct = (token: string, id: string, body: ProductPayload) =>
  request<ServerProduct>(`/products/${id}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(body),
  });

export const createOrder = (token: string, body: CreateOrderPayload) =>
  request('/orders', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });
