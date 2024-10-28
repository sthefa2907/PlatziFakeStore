import { ICategoriesRepository } from '../domain/categories.respository'

export const uploadCategoryUseCase = (repository: ICategoriesRepository) =>
  repository.uploadCategory
