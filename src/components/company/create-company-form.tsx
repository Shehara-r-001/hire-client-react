import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '../ui/form'
import { Button } from '../ui/button'
import CompanyField from './company-field'
import PhoneNumberField from '../phone-number'
import TextEditorField from '../text-editor'
import { isAdmin, isManager } from 'src/lib/authorize'
import { CompanyStatus } from 'src/models/Company.model'
import { useAppSelector } from 'src/redux/hooks'
import ImageUploadField from '../image-upload-field'
import { useCreateCompany } from 'src/hooks/data/company/useCreateCompany'
import toast from 'react-hot-toast'

const imageSchema = z.object({
  name: z.string(),
  originalUrl: z.string(),
  previewUrl: z.string().nullable(),
})

export const createComppanySchema = z.object({
  name: z.string().max(255),
  email: z.string().email().max(255),
  field: z.string().max(100), // todo: change to maybe predefined list later
  phone: z.string(),
  // phone: z.string().regex(phoneRegex), // todo: add regex
  managerId: z.string().uuid(),
  status: z.nativeEnum(CompanyStatus),
  description01: z.string(),
  description02: z.string().nullable(),
  coverImage: imageSchema.nullable(),
  image: imageSchema.nullable(),
})

export type ImageParams = z.infer<typeof imageSchema>
export type CreateCompanyParams = z.infer<typeof createComppanySchema>

const CreateCompanyForm = () => {
  const user = useAppSelector((state) => state.userReducer.user)
  const { isLoading, isSuccess, error, createCompanyMutation } = useCreateCompany()
  console.log(user)

  const form = useForm<CreateCompanyParams>({
    resolver: zodResolver(createComppanySchema),
    defaultValues: {
      name: '',
      email: '',
      field: '',
      phone: '',
      managerId: isManager(user) ? user?.id : '',
      status: isAdmin(user) ? CompanyStatus.ACTIVE : CompanyStatus.PENDING,
      description01: '',
      description02: '',
      coverImage: null,
      image: null,
    },
  })

  const onSubmit = async (data: CreateCompanyParams) => {
    try {
      const res: boolean = await createCompanyMutation(data)

      if (res) {
        // todo: navigation
        toast.success('company has been successfully created', { position: 'top-right' })
        // todo: reset image after reset form
        form.reset()
      } else {
        toast.error('creating company has been failed', { position: 'top-right' })
      }
    } catch (error) {
      console.error(error)
      toast.error('creating company has been failed', { position: 'top-right' })
    }
  }

  const { handleSubmit, control, formState } = form
  const { isValid, isDirty } = formState

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row p-3 ">
        <section className="basis-1/3 space-y-3">
          <CompanyField type="text" control={control} label="Company Name" name="name" placeholder="Company Name" />
          <CompanyField type="email" control={control} label="Company Email" name="email" placeholder="Company Email" />
          <CompanyField type="text" control={control} label="Field" name="field" placeholder="Field" />
          <PhoneNumberField control={control} label="Phone" name="phone" placeholder="phone" enableSearch />
          <div className="flex items-center space-x-2">
            <ImageUploadField control={control} label="Upload Cover Image" name="coverImage" />
            <ImageUploadField control={control} label="Upload Profile Image" name="image" />
          </div>
        </section>
        <section className="basis-2/3 space-y-[50px]">
          <TextEditorField
            control={control}
            label="Description 01"
            name="description01"
            placeholder="main description"
          />

          <TextEditorField
            control={control}
            label="Description 02"
            name="description02"
            placeholder="optional sub description"
          />
          <Button size={'lg'} className="bg-green_01" type="submit" disabled={!isValid}>
            Create
          </Button>
        </section>
      </form>
    </Form>
  )
}

export default React.memo(CreateCompanyForm)
