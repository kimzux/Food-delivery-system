export interface Category {
  id: number
  documentId: string
  name: string
  icons: string
  slug: string
}

export interface CategoryResponse {
  data: Category[]
}
