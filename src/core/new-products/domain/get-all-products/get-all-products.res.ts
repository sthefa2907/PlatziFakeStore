export interface IGetAllProductsRes {
    id: number
    title: string
    price: number
    description: string
    images: string[]
    creationAt: string
    updatedAt: string
    category: Category
  }
  
  interface Category {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
  }
  