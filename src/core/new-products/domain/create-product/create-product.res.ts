export interface ICreateProductRes {
    title: string
    price: number
    description: string
    images: string[]
    category: Category
    id: number
    creationAt: string
    updatedAt: string
  }
  
  interface Category {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
  }
  