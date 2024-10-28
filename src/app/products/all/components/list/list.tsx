/* eslint-disable react-hooks/exhaustive-deps */
import useModal from '../add/hooks/useModal';
import { useProductStore } from '../../../store/use.products.store';
import { ProductCard } from './components';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import UploadForm from '../add/add';
import { IGetAllProductsReq } from '../../../../../core/new-products/domain/get-all-products';

export const List = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const { products, loading, getAllProducts } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const currentPageParam = params.get('offset');
    if (currentPageParam && !isNaN(parseInt(currentPageParam))) {
      setCurrentPage(Math.floor(parseInt(currentPageParam) / 10) + 1);
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const loadProducts = async () => {
    const offset = (currentPage - 1) * 10;
    const limit = 10;

    params.set('offset', offset.toString());
    params.set('limit', limit.toString());

    setSearchParams(params.toString());

    const body: IGetAllProductsReq = {
      categoryId: searchParams.get('categoryId')
        ? parseInt(searchParams.get('categoryId') || '0')
        : undefined,
      offset: offset,
      limit: limit,
      price_max: searchParams.get('price_max')
        ? parseInt(searchParams.get('price_max') || '0')
        : undefined,
      price_min: searchParams.get('price_min')
        ? parseInt(searchParams.get('price_min') || '0')
        : undefined,
      title: searchParams.get('title') || undefined,
    };

    console.log('Loading products with:', body);
    await getAllProducts(body);
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      console.log('Previous Page:', currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log('Next Page:', currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h1 className='m-8'>All our products:</h1>
      <button
        className='hover:bg-primary text-gray-50 bg-secondary py-2 rounded-md mb-10'
        onClick={openModal}
      >
        Add product
      </button>
      <div className='container mx-auto py-8 bg-white rounded-md shadow-xl mb-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || loading}
            className='mr-4 px-3 py-1 rounded bg-primary text-white'
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={loading}
            className='px-3 py-1 rounded bg-primary text-white'
          >
            Next
          </button>
        </div>
      </div>
      <UploadForm
        isOpen={isOpen}
        closeModal={closeModal}
        mode='add'
        productToEdit={undefined}
      />
    </>
  );
};
