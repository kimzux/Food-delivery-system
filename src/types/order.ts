export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled'

export interface OrderItem {
  foodId: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: number
  documentId: string
  orderStatus: OrderStatus
  total: number
  address: string
  items: OrderItem[]
  createdAt: string
}

export interface OrderResponse {
  data: Order[]
}

export interface CreateOrderPayload {
  data: {
    orderStatus: OrderStatus
    total: number
    address: string
    items: OrderItem[]
  }
}
