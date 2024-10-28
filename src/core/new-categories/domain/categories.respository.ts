import { IGetAllCategoriesRes } from './get-all-categories'
import { IGetProductsByCategoryRes } from './get-products-by-category'
import { IUploadCategoryReq, IUploadCategoryRes } from './upload-category'

export interface ICategoriesRepository {
  getAllCategories(): Promise<IGetAllCategoriesRes[]>
  uploadCategory(categoryData: IUploadCategoryReq): Promise<IUploadCategoryRes>
  getProductsByCategory(
    categoryId: number
  ): Promise<IGetProductsByCategoryRes[]>
}
