import { Helmet } from 'react-helmet'

import LoginForm from 'src/components/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ImageMap } from 'src/lib/image-map'

export default function SignIn() {
  return (
    <div className="flex h-screen w-full">
      <Helmet>
        <title>HIRE | SignIn page</title>
      </Helmet>
      <img src={ImageMap.logo} alt="HIRE | logo" className="fixed left-2 top-2 h-[80px] w-[80px] lg:hidden" />
      <div className="hidden h-screen bg-background_grey lg:block lg:w-2/3">
        <img className="h-full w-full object-contain" src={ImageMap.cover} alt="hire | cover image" />
      </div>
      <div className="flex w-full items-center  justify-center lg:w-1/3">
        <Card className="w-[360px]">
          <CardHeader>
            <CardTitle>SignIn</CardTitle>
            <CardDescription className="text-lg">Please signIn to continue..</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
