import axios, { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { IUser } from 'src/models/User.model'
import { IResponse } from 'src/models/Response'
import { getLocalSorage } from 'src/lib/local-storage'

const useAuth = (staleTime = 10 * 60 * 1000) => {
  const token = getLocalSorage('token')
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string
  const VERSION = import.meta.env.VITE_API_VERSION as string
  const VERIFY_URL = `${BASE_URL}/${VERSION}/users/verify`

  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery(
    ['User'],
    async () => {
      if (!token) throw new Error('No token available')

      const response: AxiosResponse<IResponse<IUser>, any> = await axios.get(VERIFY_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    { staleTime },
  )

  const invalidateUser = () => {
    queryClient.invalidateQueries(['User'])
  }

  return { user: data?.data, isLoading, error, invalidateUser }
}

export default useAuth
