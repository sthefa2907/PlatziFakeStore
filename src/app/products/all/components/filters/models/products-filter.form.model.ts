import * as yup from 'yup'

export interface IFormValues {
  title?: string
  price_min?: string
  price_max?: string
  categoryId?: string
  offset?: string
  limit?: string
}

export const filterSchema = yup.object().shape({
  title: yup.string(),
  price_min: yup.string(),
  price_max: yup.string(),
  categoryId: yup.string(),
  offset: yup.string(),
  limit: yup.string()
})
