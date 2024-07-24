import { TriangleAlert } from 'lucide-react'

const FormError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center space-x-3 rounded-md bg-red-200 px-2 py-2">
      <TriangleAlert className="  text-red-500" size={20} />
      <p className="text-red-500">{error}</p>
    </div>
  )
}

export default FormError
