import { useForm } from 'react-hook-form'
import { IFormValues, filterSchema } from '../models'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IGetAllProductsReq } from '../../../../../../core/new-products/domain/get-all-products'
import { useProductStore } from '../../../../store/use.products.store'

export const useProductsFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const methods = useForm<IFormValues>({
    defaultValues: {
      categoryId: searchParams.get('categoryId') || '',
      price_max: searchParams.get('price_max') || '',
      price_min: searchParams.get('price_min') || '',
      title: searchParams.get('title') || ''
    },
    resolver: yupResolver(filterSchema)
  })

  const { categoryId, limit, offset, price_max, price_min, title } =
    methods.watch()

  const onChange = async () => {
    if (categoryId) {
      params.set('categoryId', categoryId);
  }
  if (title) {
      params.set('title', title);
  }
  if (price_max) {
      params.set('price_max', price_max);
  }
  if (price_min) {
      params.set('price_min', price_min);
  }
  

    if (categoryId === '') params.delete('categoryId')
    if (title === '') params.delete('title')
    if (price_max === '') params.delete('price_max')
    if (price_min === '') params.delete('price_min')

    setSearchParams(params.toString())
  }

  useEffect(() => {
    onChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, limit, offset, price_max, price_min, title])

  const { getAllProducts } = useProductStore()

  useEffect(() => {
    const body: IGetAllProductsReq = {
      categoryId: searchParams.get('categoryId')
        ? parseInt(searchParams.get('categoryId') || '0')
        : undefined,
      limit: searchParams.get('limit')
        ? parseInt(searchParams.get('limit') || '0')
        : undefined,
      offset: searchParams.get('offset')
        ? parseInt(searchParams.get('offset') || '0')
        : undefined,

      price_max: searchParams.get('price_max')
        ? parseInt(searchParams.get('price_max') || '0')
        : undefined,
      price_min: searchParams.get('price_min')
        ? parseInt(searchParams.get('price_min') || '0')
        : undefined,
      title: searchParams.get('title') || undefined
    }

    getAllProducts(body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return {
    methods
  }
}
 