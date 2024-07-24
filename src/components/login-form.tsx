import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useSignIn } from 'src/hooks/auth/useSignin'
import { Input } from './ui/input'
import { Button } from './ui/button'
import FormError from './form-error'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters long',
  }),
})

export type SignInParams = z.infer<typeof signInFormSchema>

const LoginForm = () => {
  const [signInError, setSignInError] = useState<string>('')
  const { isLoading, isSuccess, error, signInMutation } = useSignIn()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleShowPassword = () => setShow(!show)

  const onSubmit = async (values: SignInParams) => {
    try {
      await signInMutation(values)
      // navigate(PATH_DASHBOARD.dashboard)
      // toast.success('Successfully signed in', { position: 'top-right' })]
      form.reset()
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(`${error}`, { position: 'top-right' })
        setSignInError(error as string)
      } else {
        setSignInError('An error occurred during sign in.')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="youremail@something.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input id="password" type={show ? 'text' : 'password'} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-3">
          <Checkbox id="visibility" checked={show} onCheckedChange={handleShowPassword} />
          <Label htmlFor="visibility" className="text-md">
            show password
          </Label>
        </div>
        {error && <FormError error={signInError} />}
        <Button type="submit" className="bg-dark_blue01 hover:bg-dark_blue02">
          SignIn
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
