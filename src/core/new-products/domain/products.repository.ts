import { IGetAllProductsReq, IGetAllProductsRes } from './get-all-products'
import { IGetSingleProductResponse } from './get-product-by-id'
import { ICreateProductReq, ICreateProductRes } from './create-product'
import { IDeleteProductRes } from './delete-products'
import { IUpdateProductReq } from './update-products/update-product.req'
import { IUpdateProductRes } from './update-products'

export interface IProductsRepository {
  getAllProducts(body: IGetAllProductsReq): Promise<IGetAllProductsRes[]>
  getSingleProduct(id: number): Promise<IGetSingleProductResponse>
  createProduct(productData: ICreateProductReq): Promise<ICreateProductRes>
  updateProduct(
    id: number,
    productData: IUpdateProductReq
  ): Promise<IUpdateProductRes>
  deleteProduct(id: number): Promise<IDeleteProductRes>
}
