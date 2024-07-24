import React, { useCallback, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { CreateCompanyParams, ImageParams } from './company/create-company-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { IImageUploadResponse } from 'src/models/Image-response'

type ImageUploadFieldProps = {
  control: Control<CreateCompanyParams>
  name: keyof CreateCompanyParams | any
  label: string
}

const uploadUrl = import.meta.env.VITE_IMGBB_UPLOAD_URL as string
const apiKey = import.meta.env.VITE_IMGBB_API_KEY as string

const ImageUploader = ({ control, name, label }: ImageUploadFieldProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name })

  const [uploading, setUploading] = useState(false) // or use useTransition
  const [preview, setPreview] = useState<string | null>()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setUploading(true)
        setPreview(URL.createObjectURL(file))

        const formData = new FormData()
        formData.append('image', file, file.name)

        // console.log(formData)
        // console.log(formData.get('image'))

        try {
          const response = await axios.post<IImageUploadResponse>(uploadUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            params: {
              key: apiKey,
            },
          })
          const imgResponse = response.data.data
          // console.log(imgResponse)
          const image: ImageParams = {
            name: imgResponse.image.filename,
            originalUrl: imgResponse.image.url,
            previewUrl: imgResponse.thumb.url,
          }
          onChange(image)
        } catch (error) {
          console.error('Error uploading image')
        } finally {
          setUploading(false)
        }
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  })

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="space-y-1">
          <FormLabel htmlFor={name} className="pl-0.5 text-gray-500">
            {label}
          </FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className={`h-[96px] w-[176px] cursor-pointer rounded-md border border-gray-300  p-2 text-sm text-gray-500 ${
                uploading ? 'opacity-50' : ''
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="Preview" className="h-[80px] w-[160px] object-cover" />
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}

export default React.memo(ImageUploader)
