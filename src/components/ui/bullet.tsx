import { cn } from 'src/lib/utils'

const Bullet = ({ color }: { color: string }) => {
  return (
    <div
      className={cn(`mx-1 h-2 w-2 rounded-full`, color === 'default' ? 'bg-green_03' : color)}
      style={{ display: 'inline-block' }}
    ></div>
  )
}

export default Bullet
