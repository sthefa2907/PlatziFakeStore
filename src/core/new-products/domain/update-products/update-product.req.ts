export interface IUpdateProductReq {
    id: number
    title: string
    price: number
    description: string
    category: CategoryReq
    images: string[]
  }
  
  interface CategoryReq {
    id: number
  }
  