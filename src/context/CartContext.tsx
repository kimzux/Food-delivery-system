import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { OrderItem } from '../types/order'
import { CartContextType } from '../types/cart'

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const addItem = (newItem: OrderItem): void => {
    setItems((prev: OrderItem[]) => {
      const exists = prev.find((i: OrderItem) => i.foodId === newItem.foodId)
      if (exists) {
        return prev.map((i: OrderItem) =>
          i.foodId === newItem.foodId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, newItem]
    })
  }

  const removeItem = (foodId: number): void => {
    setItems((prev: OrderItem[]) =>
      prev.filter((i: OrderItem) => i.foodId !== foodId)
    )
  }

  const updateQuantity = (foodId: number, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(foodId)
      return
    }
    setItems((prev: OrderItem[]) =>
      prev.map((i: OrderItem) => (i.foodId === foodId ? { ...i, quantity } : i))
    )
  }

  const clearCart = (): void => setItems([])

  const total: number = items.reduce(
    (sum: number, item: OrderItem) => sum + item.price * item.quantity,
    0
  )

  const totalItems: number = items.reduce(
    (sum: number, item: OrderItem) => sum + item.quantity,
    0
  )
  const openCart = (): void => setIsCartOpen(true)
  const closeCart = (): void => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
