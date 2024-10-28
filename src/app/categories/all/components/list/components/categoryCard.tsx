import { Link } from 'react-router-dom'
import { IGetAllCategoriesRes } from '../../../../../../core/new-categories/domain/get-all-categories'
import { useState } from 'react'

export const CategoryCard = ({
  category
}: {
  category: IGetAllCategoriesRes
}) => {
  
  const [imageError, setImageError] = useState(false)

  
  const handleImageError = () => {
    setImageError(true) 
  }

  return (
    <Link
      to={`/categories/${category.id}`}
      className='w-full'
    >
      <div className='relative group cursor-pointer overflow-hidden duration-500 m-4 h-80 bg-secondary text-gray-50 p-5 rounded shadow'>
        <div className='w-full'>
          <div className='group-hover:scale-110 w-full h-60 duration-500'>
           
            <img
              className='h-full w-full object-cover rounded max-h-60'
              src={
                imageError
                  ? 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
                  : category.image
              }
              alt={category.name}
              onError={handleImageError} 
            />
          </div>
          <div className='absolute left-4 width-full p-5 -bottom-16 duration-500 group-hover:-translate-y-12'>
            <div className='absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 group-hover:opacity-100 rounded group-hover:bg-primary'></div>
            <span className='text-xl font-bold'>{category.name}</span>
            <p className='group-hover:opacity-100 w-full duration-500 opacity-0 mt-6'>
              Check it out!
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
