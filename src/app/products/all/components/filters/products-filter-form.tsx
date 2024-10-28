/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from 'react'
import { useProductsFilterForm } from './hooks/use-products-filter-form'
import { useCategoryStore } from '../../../../categories/store/use.category.store'

export const ProductsFilterForm = () => {
  const { methods } = useProductsFilterForm()
  const { categories, getAllCategories } = useCategoryStore()
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    getAllCategories()
  }, [])

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    methods.setValue('categoryId', e.target.value)
  }

  return (
    <form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 shadow-md'>
      <input
        {...methods.register('title')}
        placeholder='Title'
        type='text'
        className='p-2 border rounded-lg block mx-auto w-full'
      />

      <input
        {...methods.register('price_min')}
        placeholder='Price min'
        type='number'
        className='p-2 border rounded-lg block mx-auto w-full'
      />

      <input
        {...methods.register('price_max')}
        placeholder='Price max'
        type='number'
        className='p-2 border rounded-lg block mx-auto w-full'
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='p-2 border rounded-lg block mx-auto w-full'
      >
        <option value=''>Select Category</option>
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </form>
  )
}
