// UploadForm.tsx
import React, { useEffect, useState } from 'react';
import './styles/uploadForm.css';
import { useForm } from 'react-hook-form';
import { useProductStore } from '../../../store/use.products.store';
import { IUpdateProductReq } from '../../../../../core/new-products/domain/update-products';
import { useCategoryStore } from '../../../../categories/store/use.category.store';

interface UploadFormProps {
  isOpen: boolean;
  closeModal: () => void;
  productToEdit?: IUpdateProductReq;
  mode: 'add' | 'edit';
}

const UploadForm: React.FC<UploadFormProps> = ({
  isOpen,
  closeModal,
  productToEdit,
  mode,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { categories, loading, getAllCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    if (mode === 'edit' && productToEdit) {
      setValue('title', productToEdit.title);
      setValue('price', productToEdit.price);
      setValue('description', productToEdit.description);
      setValue('category.id', productToEdit.category.id);
      setValue('images', productToEdit.images[0]);
    }
  }, [mode, productToEdit, setValue]);

  const { createProduct, updateProduct } = useProductStore();

  const onSubmit = async (data: any) => {
    try {
      const images = Array.isArray(data.images) ? data.images : [data.images];
      const productData = {
        ...data,
        images,
        categoryId: selectedCategory,
      };
      if (mode === 'edit' && productToEdit) {
        updateProduct(productToEdit.id, productData);
      } else {
        createProduct(productData);
      }
      handleClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleClose = () => {
    closeModal();
    reset();
  };

  if (!isOpen) return null; 

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className='modal-overlay' onClick={handleClose}></div>
      <div className='modal-content'>
        <form className='px-7 grid justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
          <b>
            <h2 className='mb-8'>Upload a Product</h2>
          </b>
          <div className='grid gap-6' id='form'>
            <div className='w-full flex gap-3'>
              <label>Product Name</label>
              <input
                className='capitalize shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-gray'
                type='text'
                placeholder='Product Name'
                {...register('title')}
              />
              <label htmlFor='Price'>Product Price</label>
              <input
                className='p-3 capitalize shadow-2xl glass w-full placeholder:text-gray outline-none focus:border-solid focus:border-[1px] border-[#035ec5]'
                type='number'
                placeholder='Product Price'
                {...register('price')}
              />
            </div>
            <div className='grid gap-6 w-full'>
              <label>Description</label>
              <textarea
                className='p-3 shadow-2xl glass w-full placeholder:text-gray outline-none focus:border-solid border-[#035ec5] focus:border-[1px]'
                placeholder='Description'
                id='description'
                rows={4}
                {...register('description')}
              ></textarea>
              <label htmlFor='Date'>Select a Category</label>
              <select
                className='capitalize shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-gray'
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
              >
                <option value=''>Select Category</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
              <label htmlFor='Date'>Upload your images</label>
              <input
                className='capitalize shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-gray'
                type='text'
                placeholder='Paste your link here'
                {...register('images')}
              />
            </div>
            <button className='outline-none glass shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold'>
              Submit
            </button>
          </div>
        </form>
        <button className='modal-close' onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
