import React from 'react'
import './uploadForm.css'
import { useForm } from 'react-hook-form'
import { useCategoryStore } from '../../../../../store/use.category.store'
import { IUploadCategoryReq } from '../../../../../../../core/new-categories/domain/upload-category'

interface UploadFormProps {
  isOpen: boolean
  closeModal: () => void
}

const UploadForm: React.FC<UploadFormProps> = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, reset } = useForm()
  const { uploadCategory } = useCategoryStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const OnSubmit = async (data: any) => {
    try {
      const images = Array.isArray(data.images) ? data.images : [data.images]
      const productData: IUploadCategoryReq = { ...data, images }

      uploadCategory(productData)
      console.log('Product created:', productData)

      closeModal()
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleClose = () => {
    closeModal()
    reset()
  }

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className='modal-overlay'></div>
      <div className='modal-content'>
        <form 
          className='px-7 grid justify-center items-center'
          onSubmit={handleSubmit(OnSubmit)}
        >
          <b>
            <h2 className='mb-8'>Upload a Category</h2>
          </b>
          <div
            className='grid gap-6'
            id='form'
          >
            <div className='w-full flex gap-3'>
              <label>Category Name</label>
              <input
                className='capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-gray'
                type='text'
                placeholder='Category Name'
                {...register('name')}
              />
              <label htmlFor='Date'>Upload your image</label>
              <input
                className='capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-gray'
                type='text'
                placeholder='Paste your link here'
                {...register('image')}
              />
            </div>

            <button className='outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold'>
              Upload
            </button>
          </div>
        </form>
        <button
          className='modal-close'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default UploadForm
