import { IProductsRepository } from '../domain/products.repository'

export const createProductUseCase = (repository: IProductsRepository) =>
  repository.createProduct
