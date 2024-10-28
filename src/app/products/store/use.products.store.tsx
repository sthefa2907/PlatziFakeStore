import { create } from 'zustand'
import { getAllProductsUseCase } from '../../../core/new-products/application/get-all-product.use-case'
import { productsRepository } from '../../../core/new-products/infraestructure/products.repository'
import {
  IGetAllProductsReq,
  IGetAllProductsRes
} from '../../../core/new-products/domain/get-all-products'
import { ICreateProductReq } from '../../../core/new-products/domain/create-product'
import { createProductUseCase } from '../../../core/new-products/application/create-product.use-case'
import { updateProductUseCase } from '../../../core/new-products/application/update-product.use-case'
import { IUpdateProductReq } from '../../../core/new-products/domain/update-products'
import { deleteProductUseCase } from '../../../core/new-products/application/delete-product.use-case'
import { getSingleProductUseCase } from '../../../core/new-products/application/get-product-by-id-use-case'
import { IGetSingleProductResponse } from '../../../core/new-products/domain/get-product-by-id'

type States = {
  products: IGetAllProductsRes[]
  loading: boolean
}

type Actions = {
  getAllProducts: (body: IGetAllProductsReq) => void
  createProduct: (productData: ICreateProductReq) => void
  updateProduct: (id: number, productData: IUpdateProductReq) => void
  deleteProduct: (id: number) => void
  getSingleProduct: (id: number) => Promise<IGetSingleProductResponse | null>
}

type Store = States & Actions

export const useProductStore = create<Store>((set) => ({
  products: [],
  loading: true,

  getAllProducts: async (body) => {
    const data = await getAllProductsUseCase(productsRepository)(body)
    set({ products: data, loading: false })
  },

  createProduct: async (productData) => {
    const data = await createProductUseCase(productsRepository)(productData)
    console.log(data)
  },

  updateProduct: async (id, productData) => {
    console.log(productData)
    const data = await updateProductUseCase(productsRepository)(id, productData)
    console.log(data)
  },
  deleteProduct: async (id) => {
    const data = await deleteProductUseCase(productsRepository)(id)
    console.log(data)
  },

  getSingleProduct: async (id) => {
    const data = await getSingleProductUseCase(productsRepository)(id)
    return data
  }
}))
