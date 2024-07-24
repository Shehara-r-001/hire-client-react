import { Link } from 'react-router-dom'

import { Button } from './ui/button'

const SignButton = ({ type, href, onClick }: { type: 'SignIn' | 'SignOut'; href: string; onClick?: () => void }) => {
  return (
    <Link to={href}>
      <Button
        onClick={onClick}
        className="w-[60px] border border-green_04 bg-black_A text-sm font-semibold text-white  hover:border-green_04 hover:bg-black_A hover:shadow-greened lg:h-[40px] lg:w-[180px] lg:text-base"
      >
        {type}
      </Button>
    </Link>
  )
}

export default SignButton
