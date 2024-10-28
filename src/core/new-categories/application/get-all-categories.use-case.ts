import { ICategoriesRepository } from '../domain/categories.respository'

export const getAllCategoriesUseCase = (repository: ICategoriesRepository) =>
  repository.getAllCategories
