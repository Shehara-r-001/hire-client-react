import React, { HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { CreateCompanyParams } from './create-company-form'
import { Input } from '../ui/input'

type CompanyFieldProps = {
  control: Control<CreateCompanyParams>
  name: keyof CreateCompanyParams | any
  placeholder: string
  label: string
  type: HTMLInputTypeAttribute | undefined
}

const CompanyField = ({ control, name, placeholder, label, type }: CompanyFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className=" space-y-1">
        <FormLabel htmlFor={name as string} className="pl-0.5 text-gray-500">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            id={name as string}
            type={type}
            placeholder={placeholder}
            {...field}
            className="w-[400px] text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default React.memo(CompanyField)
