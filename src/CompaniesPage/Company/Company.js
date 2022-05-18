import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { CompanyName, EditButton, Wrapper } from './Company.styles'

export const Company = ({ company, navigateToCompany }) => {
  return (
    <Wrapper>
      <CompanyName>{company.name}</CompanyName>
      <EditButton onClick={() => navigateToCompany(company.id)}>
        <EditIcon />
      </EditButton>
    </Wrapper>
  )
}
