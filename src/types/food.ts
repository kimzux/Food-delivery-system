export interface FoodImage {
  id: number
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats: {
    thumbnail: { url: string }
    small: { url: string }
    medium: { url: string }
    large: { url: string }
  }
}

export interface Food {
  id: number
  documentId: string
  name: string
  price: number
  description: string
  image: FoodImage[]
  category: {
    id: number
    name: string
    slug: string
  } | null
}

export interface FoodResponse {
  data: Food[]
}
