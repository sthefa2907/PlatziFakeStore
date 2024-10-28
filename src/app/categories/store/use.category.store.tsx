import { create } from 'zustand'
import { IGetAllCategoriesRes } from '../../../core/new-categories/domain/get-all-categories/get-all-categories.req'
import { getAllCategoriesUseCase } from '../../../core/new-categories/application/get-all-categories.use-case'
import { categoriesRepository } from '../../../core/new-categories/infraestructure/categories.repository'
import { IUploadCategoryReq } from '../../../core/new-categories/domain/upload-category'
import { uploadCategoryUseCase } from '../../../core/new-categories/application/upload-category.use-case'
import { getProductByCategoryUseCase } from '../../../core/new-categories/application/get-products-by-category.use-case'
import { IGetProductsByCategoryRes } from '../../../core/new-categories/domain/get-products-by-category'

type States = {
  categories: IGetAllCategoriesRes[]
  loading: boolean
}

type Actions = {
  getAllCategories: () => void
  uploadCategory: (categoryData: IUploadCategoryReq) => void
  getProductByCategory: (
    categoryId: number
  ) => Promise<IGetProductsByCategoryRes[] | null>
}

type Store = States & Actions

export const useCategoryStore = create<Store>((set) => ({
  categories: [],
  loading: true,

  getAllCategories: async () => {
    const data = await getAllCategoriesUseCase(categoriesRepository)()
    set({ categories: data, loading: false })
  },

  uploadCategory: async (categoryData) => {
    const data = await uploadCategoryUseCase(categoriesRepository)(categoryData)
    console.log(data)
  },

  getProductByCategory: async (categoryId) => {
    const data =
      await getProductByCategoryUseCase(categoriesRepository)(categoryId)
    return data
  }
}))
