export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  features?: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}

export interface CartItem extends Product {
  quantity: number
}
