import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import useCompanies from 'src/hooks/data/company/useCompanies'
import { Company } from './company'
import { PATH_ROOT } from 'src/lib/paths'

export default function Companies() {
  const { companies, isLoading, error } = useCompanies({ page: 1, pageSize: 10 })
  // ! lazy is not working
  // todo: add pagination

  return (
    <div className="">
      <Helmet>
        <title>HIRE | Companies page</title>
      </Helmet>
      <div className="grid grid-cols-4 gap-3 px-4 pt-4">
        {companies?.list?.map((company) => (
          // <Suspense key={company.id} fallback={<p>hhhhhhhhhhhhhhhh</p>}>
          <Link key={company.id} to={`${PATH_ROOT.companies}/${company?.id}`}>
            <Company company={company} />
          </Link>
          // </Suspense>
        ))}
      </div>
    </div>
  )
}
