import { Helmet } from 'react-helmet'
import CreateCompanyForm from 'src/components/company/create-company-form'

export default function CreateCompany() {
  return (
    <>
      <Helmet>
        <title>HIRE | Companies page</title>
      </Helmet>
      <CreateCompanyForm />
    </>
  )
}
