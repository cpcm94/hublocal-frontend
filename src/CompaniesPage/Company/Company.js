import React from 'react'
import { EditButton } from '../../_shared/EditButton'
import { CompanyName, Wrapper } from './Company.styles'

export const Company = ({
  company,
  navigateToCompany,
  navigateToLocations,
}) => {
  return (
    <Wrapper>
      <CompanyName onClick={() => navigateToLocations(company.id)}>
        {company.name}
      </CompanyName>
      <EditButton onClick={() => navigateToCompany(company.id)} />
    </Wrapper>
  )
}
