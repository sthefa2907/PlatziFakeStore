import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCategoryStore } from '../store/use.category.store'
import { IGetProductsByCategoryRes } from '../../../core/new-categories/domain/get-products-by-category/get-products-by-category.res'

const CategoryProductsPage: React.FC = () => {
  const { id: categoryId } = useParams<{ id: string }>()
  const [categoryProducts, setCategoryProducts] = useState<
    IGetProductsByCategoryRes[] | null
  >(null)
  const { getProductByCategory } = useCategoryStore()
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        if (categoryId) {
          const categoryIdNumber = parseInt(categoryId)
          const allProducts = await getProductByCategory(categoryIdNumber)
          console.log(allProducts)
          setCategoryProducts(allProducts)
        }
      } catch (error) {
        console.error('Error fetching category products:', error)
      }
    }

    fetchCategoryProducts()
  }, [categoryId])

  return (
    <div className='container mx-auto py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center'>
        {categoryProducts &&
          categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  )
}

const ProductCard: React.FC<{ product: IGetProductsByCategoryRes }> = ({
  product
}) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className='w-70 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-md'>
      <div className='h-48 bg-gray-200 rounded-md'>
        <img
          className='h-full w-full object-cover rounded-xl'
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

export default CategoryProductsPage
