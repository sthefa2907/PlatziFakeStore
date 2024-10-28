import { Link } from 'react-router-dom'
import { useState } from 'react'
import { IGetAllProductsRes } from '../../../../../../core/new-products/domain/get-all-products'

export const ProductCard = ({ product }: { product: IGetAllProductsRes }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className='w-70 h-80 bg-gray-200 p-2 m-2 flex flex-col shadow-md rounded-md'>
      <div className='h-48 bg-gray-300 rounded-md'>
        <img
          className='h-full w-full  object-cover rounded-xl'
          src={
            imageError
              ? 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
              : product.images[0]
          }
          alt={product.title}
          onError={handleImageError}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <span className='text-md font-bold truncate'>
            {product.title.length > 25
              ? product.title.slice(0, 19) + '... '
              : product.title}
          </span>
        </div>

        <p className='font-bold text-red-600'>${product.price}</p>
        <Link to={`/products/${product.id}`}>
          <button className='hover:bg-primary text-gray-50 bg-secondary py-2 rounded-md'>
            See more
          </button>
        </Link>
      </div>
    </div>
  )
}
