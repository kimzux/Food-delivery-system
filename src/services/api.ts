import { CategoryResponse } from '../types/category'
import { FoodResponse } from '../types/food'
import { CreateOrderPayload, Order, OrderResponse } from '../types/order'

const BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:1337'

const fetcher = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options)
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)
  return res.json()
}

export const api = {
  categories: {
    getAll: (): Promise<CategoryResponse> =>
      fetcher<CategoryResponse>('/api/categories?populate=*'),
  },

  foods: {
    getAll: (): Promise<FoodResponse> =>
      fetcher<FoodResponse>('/api/foods?populate=*'),

    getByCategory: (slug: string): Promise<FoodResponse> =>
      fetcher<FoodResponse>(
        `/api/foods?populate=*&filters[category][slug][$eq]=${slug}`
      ),
  },
  orders: {
    getAll: (): Promise<OrderResponse> => fetcher('/api/orders'),

    getOne: (documentId: string): Promise<{ data: Order }> =>
      fetcher(`/api/orders/${documentId}`),

    create: (payload: CreateOrderPayload): Promise<{ data: Order }> =>
      fetcher('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
  },
}
