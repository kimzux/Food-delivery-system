import type { OrderItem } from './order'

export interface CartContextType {
  items: OrderItem[]
  addItem: (item: OrderItem) => void
  removeItem: (foodId: number) => void
  updateQuantity: (foodId: number, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  total: number
  totalItems: number
}
