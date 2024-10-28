import React, { useState } from 'react'
import useModal from '../all/components/add/hooks/useModal'
import UploadForm from '../all/components/add/add'
import useProductDetails from './hooks/use-product.selected'

const ProductDetails: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const { product, handleDeleteProduct } = useProductDetails()

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleEditProduct = () => {
    openModal()
  }

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-row gap-2'>
          <div className='w-4 h-4 rounded-full bg-primary animate-bounce'></div>
          <div className='w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]'></div>
          <div className='w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]'></div>
        </div>
      </div>
    )
  }

  const updatedProduct = {
    ...product,
    category: {
      id: product.category.id,
      name: product.category.name,
      image: product.category.image
    }
  }

  return (
    <div className='flex flex-col lg:flex-row lg:items-center'>
      <div className='lg:w-1/2 lg:pr-8'>
        <img
          src={product.images[selectedImageIndex]}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src =
              'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
          }}
          className='w- mb-4 lg:mb-0 rounded-lg'
        />
        <div className='flex space-x-4'>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src =
                  'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
              }}
              className={`w-16 h-16 cursor-pointer border ${
                selectedImageIndex === index
                  ? 'border-blue-500'
                  : 'border-gray-200'
              } rounded`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
      <div className='lg:w-full lg:pl-8'>
        <h2 className='text-xl lg:text-3xl font-bold'>{product.title}</h2>
        <p className='text-sm lg:text-base text-gray-600'>${product.price}</p>
        <p className='text-sm lg:text-base'>
          Category: <b>{product.category.name}</b>
        </p>
        <p className='text-sm lg:text-base'>About this product:</p>
        <p className='text-sm lg:text-base'>{product.description}</p>
        <div className='flex mt-4 justify-center'>
          <button
            className='bg-green-500 text-white px-4 py-2 mr-4 rounded'
            onClick={handleEditProduct}
          >
            Edit
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={handleDeleteProduct}
          >
            Delete
          </button>
        </div>
      </div>
      {isOpen && product && (
        <UploadForm
          isOpen={isOpen}
          closeModal={closeModal}
          productToEdit={updatedProduct}
          mode={'edit'}
        />
      )}
    </div>
  )
}

export default ProductDetails
