import { IProductsRepository } from '../domain/products.repository'

export const getSingleProductUseCase = (repository: IProductsRepository) =>
  repository.getSingleProduct
