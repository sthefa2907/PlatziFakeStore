import { ICategoriesRepository } from '../domain/categories.respository'

export const getProductByCategoryUseCase = (
  repository: ICategoriesRepository
) => repository.getProductsByCategory
