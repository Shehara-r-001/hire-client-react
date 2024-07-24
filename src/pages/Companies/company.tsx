import Bullet from 'src/components/ui/bullet'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import useCapitalizeWords from 'src/hooks/useCapitalize'
import { ICompany } from 'src/models/Company.model'

export const Company = ({ company }: { company: ICompany }) => {
  const companyName = useCapitalizeWords(company.name)

  return (
    <Card className="w-[300px]">
      <CardHeader className="w-full p-0">
        <img
          src={company.coverImage?.originalUrl}
          alt={company.coverImage?.name}
          className=" h-[80px] w-full rounded-t-md object-cover"
        />
      </CardHeader>
      <CardTitle className="px-2 py-2">{companyName}</CardTitle>
      <CardContent className="space-y-1 px-2 text-sm">
        <p className="px-1 font-bold">address/location</p>
        <div className="flex items-center">
          <Bullet color="default" />
          <p className="text-sm font-semibold text-black_A">
            {company.Vacancies?.length > 0 ? `${company.Vacancies.length} vacanies available` : `No vacanies`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
