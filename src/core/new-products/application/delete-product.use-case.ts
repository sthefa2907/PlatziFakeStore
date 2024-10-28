import { IProductsRepository } from '../domain/products.repository'

export const deleteProductUseCase = (repository: IProductsRepository) =>
  repository.deleteProduct
