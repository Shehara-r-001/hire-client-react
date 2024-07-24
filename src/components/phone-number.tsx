import React from 'react'
import { Control, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { CreateCompanyParams } from './company/create-company-form'

type PhoneNumberFieldProps = {
  control: Control<CreateCompanyParams>
  name: keyof CreateCompanyParams | any
  placeholder: string
  label: string
  enableSearch: boolean
}

const PhoneNumberField = ({ control, name, placeholder, label, enableSearch = false }: PhoneNumberFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel htmlFor={name} className="pl-0.5 text-gray-500">
          {label}
        </FormLabel>
        <FormControl>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ref } }) => (
              <PhoneInput
                country={'lk'}
                value={value}
                onChange={onChange}
                inputProps={{
                  id: name,
                  placeholder: placeholder,
                  ref: ref,
                  className:
                    'w-[400px] text-sm focus-visible:ring-0 focus-visible:ring-offset-0 py-2 pl-12 outline-none border border-1 rounded-sm text-gray-500 font-semibold',
                }}
              />
            )}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default React.memo(PhoneNumberField)
