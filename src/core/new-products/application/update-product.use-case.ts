import { IProductsRepository } from '../domain/products.repository'

export const updateProductUseCase = (repository: IProductsRepository) =>
  repository.updateProduct
