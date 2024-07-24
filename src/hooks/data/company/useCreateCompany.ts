import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { CreateCompanyParams } from 'src/components/company/create-company-form'
import { BASE_API_URL, VERSION } from 'src/constants/env.constants'
import { getLocalSorage } from 'src/lib/local-storage'
import { IResponse } from 'src/models/Response'

type CreateCompanyResult = {
  error: string | null
  isLoading: boolean
  isSuccess: boolean
  createCompanyMutation: (params: CreateCompanyParams) => Promise<boolean>
}

const createCompany = async (createCompanyParams: CreateCompanyParams) => {
  const token = getLocalSorage('token')
  console.log(token)
  console.log(BASE_API_URL)
  console.log(`${BASE_API_URL}/${VERSION}/companies`)
  const response: AxiosResponse<IResponse<boolean>> = await axios.post(
    `${BASE_API_URL}/${VERSION}/companies`,
    createCompanyParams,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  console.log(response)

  return response.data
}

export const useCreateCompany = (): CreateCompanyResult => {
  const { mutateAsync: createCompanyMutation, isLoading, isError, isSuccess, error } = useMutation(createCompany)

  const createCompanyF = async (params: CreateCompanyParams) => {
    try {
      const res = await createCompanyMutation(params)

      return res.data
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        // todo: how to send the error to front
        throw error.response?.data?.data
      }

      throw error
    }
  }

  return {
    error: isError ? 'creating company has been failed' : null,
    isLoading,
    isSuccess,
    createCompanyMutation: createCompanyF,
  }
}
