import React from 'react'
import { Control, Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { CreateCompanyParams } from './company/create-company-form'

type TextEditorFieldProps = {
  control: Control<CreateCompanyParams>
  name: keyof CreateCompanyParams | any
  placeholder: string
  label: string
}

const TextEditorField = ({ control, name, placeholder, label }: TextEditorFieldProps) => (
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
            render={({ field: { onChange, value } }) => (
              <ReactQuill
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                className="h-[100px] w-2/3"
              />
            )}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default React.memo(TextEditorField)
