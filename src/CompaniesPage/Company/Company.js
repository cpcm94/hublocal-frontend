import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { CompanyName, EditButton, Wrapper } from './Company.styles'

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
      <EditButton onClick={() => navigateToCompany(company.id)}>
        <EditIcon />
      </EditButton>
    </Wrapper>
  )
}
