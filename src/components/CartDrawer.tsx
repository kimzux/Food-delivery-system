import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'
import type { OrderItem } from '../types/order'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const [address, setAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleOrder = async (): Promise<void> => {
    if (!address.trim()) {
      setError('Please enter your delivery address')
      return
    }

    if (items.length === 0) {
      setError('Your cart is empty')
      return
    }

    try {
      setLoading(true)
      setError(null)

      await api.orders.create({
        data: {
          orderStatus: 'pending',
          total: parseFloat(total.toFixed(2)),
          address: address.trim(),
          items: items,
        },
      })

      setSuccess(true)
      clearCart()
      setAddress('')
    } catch (err) {
      setError('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (): void => {
    setSuccess(false)
    setError(null)
    onClose()
  }

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900">
            Your Cart
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">
              Order Placed!
            </h3>
            <p className="text-sm font-['Poppins'] text-gray-500 text-center">
              Your order has been placed successfully and is now pending.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-[#EB0029] text-white py-3 rounded-xl font-['Poppins'] font-medium hover:bg-red-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
                <span className="text-5xl">🛒</span>
                <p className="text-gray-400 font-['Poppins'] text-sm">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                  {items.map((item: OrderItem) => (
                    <div
                      key={item.foodId}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h4 className="text-sm font-['Poppins'] font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm font-['Poppins'] font-bold text-[#EB0029] mt-0.5">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.foodId, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-[#EB0029] hover:text-[#EB0029] transition-colors text-lg"
                        >
                          -
                        </button>
                        <span className="text-sm font-['Poppins'] font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.foodId, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#EB0029] text-white hover:bg-red-600 transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.foodId)}
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-4">
                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-['Poppins'] text-gray-500">
                      Total
                    </span>
                    <span className="text-lg font-['Poppins'] font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter delivery address"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-['Poppins'] text-gray-700 outline-none focus:border-[#EB0029] transition-colors"
                  />

                  {error && (
                    <p className="text-xs font-['Poppins'] text-red-500">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-[#EB0029] hover:bg-red-600 disabled:bg-red-300 text-white py-3 rounded-xl font-['Poppins'] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Placing order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
