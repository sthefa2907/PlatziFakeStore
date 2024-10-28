import useModal from './hooks/useModal'
import UploadForm from './components/uploadForm/uploadform'
import { CategoryCard } from './components/categoryCard'
import { useCategoryStore } from '../../../store/use.category.store'
import { useEffect } from 'react'

export const CategoryList = () => {
  const { categories, getAllCategories } = useCategoryStore()
  useEffect(() => {
    getAllCategories()
  })

  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-5xl text-black mb-8'>All our categories:</h1>
      <button
        className='hover:bg-primary text-gray-50 bg-secondary rounded-md w-full sm:w-auto mb-10'
        onClick={openModal}
      >
        Add Category
      </button>
      <div className='flex flex-col items-center bg-white shadow-lg rounded-md'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mt-10 mb-10'>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
        <UploadForm
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </div>
    </div>
  )
}
