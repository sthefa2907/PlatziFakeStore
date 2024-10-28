import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IGetSingleProductResponse } from '../../../../core/new-products/domain/get-product-by-id'
import { useProductStore } from '../../store/use.products.store'
import { useNavigate } from 'react-router-dom'

const useProductDetails = () => {
  const navigate = useNavigate()
  const { getSingleProduct, deleteProduct } = useProductStore()
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<IGetSingleProductResponse | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const fetchedProduct = await getSingleProduct(parseInt(id))
          setProduct(fetchedProduct)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [getSingleProduct, id])

  const handleDeleteProduct = async () => {
    try {
      if (id) {
        deleteProduct(parseInt(id))
        alert(`Product ${id} deleted successfully`)
        navigate('/')
        setProduct(null)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return { product, handleDeleteProduct }
}

export default useProductDetails
