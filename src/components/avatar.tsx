import { IUser } from 'src/models/User.model'
import { AvatarFallback, AvatarImage, Avatar as AvatarWrapper } from './ui/avatar'

type AvatarProps = {
  user: IUser
}

const placeholder = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'

const Avatar = ({ user }: AvatarProps) => {
  return (
    <AvatarWrapper className="">
      <AvatarImage src={placeholder} />
      <AvatarFallback>H</AvatarFallback>
    </AvatarWrapper>
  )
}

export default Avatar
