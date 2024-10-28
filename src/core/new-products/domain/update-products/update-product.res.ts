export interface IUpdateProductRes {
    id: number
    title: string
    price: number
    description: string
    images: string[]
    creationAt: string
    updatedAt: string
    category: CategoryRes
  }
  
  interface CategoryRes {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
  }
  