import { IProductsRepository } from '../domain/products.repository'

export const getAllProductsUseCase = (repository: IProductsRepository) =>
  repository.getAllProducts
