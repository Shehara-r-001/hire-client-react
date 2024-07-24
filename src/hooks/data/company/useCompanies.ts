import axios, { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'

import { IResponse } from 'src/models/Response'
import { ICompany } from 'src/models/Company.model'
import { IPaginatedResponse, IPaginationRequest } from 'src/models/Pagination'
import { getLocalSorage } from 'src/lib/local-storage'

/**
 * fetch paginated company list
 * @param paginationRequest
 * @param staleTime ttl
 * @returns
 */
const useCompanies = (paginationRequest: IPaginationRequest, staleTime = 5 * 60 * 1000) => {
  const token = getLocalSorage('token')
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string
  const VERSION = import.meta.env.VITE_API_VERSION as string
  const VERIFY_URL = `${BASE_URL}/${VERSION}/companies`

  const queryParams = new URLSearchParams()
  if (paginationRequest.page) queryParams.append('page', paginationRequest.page.toString())
  if (paginationRequest.pageSize) queryParams.append('pageSize', paginationRequest.pageSize.toString())
  if (paginationRequest.sortBy) queryParams.append('sortBy', paginationRequest.sortBy)
  if (paginationRequest.sortType) queryParams.append('sortType', paginationRequest.sortType)
  if (paginationRequest.query) queryParams.append('query', paginationRequest.query)
  if (paginationRequest.filters) queryParams.append('filters', paginationRequest.filters)

  const { data, isLoading, isError, error, refetch } = useQuery(
    ['Companies', queryParams.toString()],
    async () => {
      // const delay = new Promise((resolve) => setTimeout(resolve, 2000))
      // await delay

      const response: AxiosResponse<IResponse<IPaginatedResponse<ICompany>>, any> = await axios.get(
        `${VERIFY_URL}?${queryParams.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      )

      return response.data
    },
    { staleTime },
  )

  return { companies: data?.data, isLoading, isError, error, refetch }
}

export default useCompanies
