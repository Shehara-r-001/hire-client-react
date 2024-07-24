import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { SignInParams } from './../../components/login-form'
import { setLocalStorage } from 'src/lib/local-storage'
import { IResponse } from 'src/models/Response'
import { PATH_DASHBOARD } from 'src/lib/paths'
import { IUser } from 'src/models/User.model'
import { useAppDispatch } from 'src/redux/hooks'
import { login } from 'src/redux/slices/userSlice'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string
const VERSION = import.meta.env.VITE_API_VERSION as string
const VERIFY_URL = `${BASE_API_URL}/${VERSION}/users/verify`

interface SignInResult {
  error: any
  isLoading: boolean
  isSuccess: boolean
  signInMutation: (params: SignInParams) => Promise<void>
}

const signIn = async ({ email, password }: SignInParams) => {
  const response: AxiosResponse<IResponse<string>, any> = await axios.post(`${BASE_API_URL}/${VERSION}/auth/signin`, {
    email,
    password,
  })

  return response.data
}

const fetchUser = async (token: string) => {
  const response: AxiosResponse<IResponse<IUser>, any> = await axios.get(VERIFY_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}

export const useSignIn = (): SignInResult => {
  const navigate = useNavigate()
  const { mutateAsync: signInMutation, isLoading, isError, isSuccess, error } = useMutation(signIn)
  const dispatch = useAppDispatch()

  const signInUSer = async (params: SignInParams) => {
    try {
      const data = await signInMutation(params)
      setLocalStorage('token', data?.data)

      const loggedInUser = await fetchUser(data?.data)
      // console.log(loggedInUser)
      dispatch(login(loggedInUser))

      navigate(PATH_DASHBOARD.dashboard)
      toast.success('Successfully signed in', { position: 'top-right' })
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data?.data
      }
      // console.error('Error signing in..', error)
      throw error
    }
  }

  return {
    error: isError ? 'Signin has been failed..!' : null,
    isLoading,
    isSuccess,
    signInMutation: signInUSer,
  }
}
