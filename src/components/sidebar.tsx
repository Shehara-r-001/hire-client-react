import { Link, useNavigate } from 'react-router-dom'

import { PATH_AUTH, PATH_DASHBOARD } from 'src/lib/paths'
import NavLinks from './nav-links'
import useAuth from 'src/hooks/auth/useAuth'
import { ImageMap } from 'src/lib/image-map'
import SignButton from './sign-btn'
import { removeFromLocalStorage } from 'src/lib/local-storage'
import { useAppDispatch } from 'src/redux/hooks'
import { logout } from 'src/redux/slices/userSlice'

const SideBar = () => {
  const { user, invalidateUser } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logout())
    removeFromLocalStorage('token')
    invalidateUser()
    navigate(PATH_AUTH.signin)
  }

  return (
    <div className="h-screen w-[80px] bg-black_A shadow-md lg:w-[280px]">
      <Link to={PATH_DASHBOARD.dashboard}>
        <img src={ImageMap.logo_black_green_2} alt="hire logo" className="mb-3 w-[80px] px-4 lg:w-[180px]" />
      </Link>
      {/* <div className="mb-4 ml-4 h-[1px] w-[50px] bg-slate-300 lg:w-[120px]"></div> */}
      <div className="px-2">
        <NavLinks />
        <div className="fixed bottom-0 left-0 flex w-[80px] justify-center pb-3 lg:w-[240px]">
          {/* <LanguageSelector /> */}
          {user ? (
            <SignButton type="SignOut" href="#" onClick={handleSignOut} />
          ) : (
            <SignButton type="SignIn" href={PATH_AUTH.signin} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
