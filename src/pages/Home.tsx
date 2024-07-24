import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import useAuth from 'src/hooks/auth/useAuth'
import { PATH_AUTH } from 'src/lib/paths'

export default function Home() {
  const { t } = useTranslation('translation')
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) navigate(PATH_AUTH.signin)
  }, [user, isLoading, navigate])

  if (isLoading) {
    return <div>loading.....</div>
  }

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
    </>
  )
}
