import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Company } from './Company/Company'
import { AddCompanyButton, CompaniesList } from './CompaniesPage.styles'
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const CompaniesPage = ({ companies }) => {
  let navigate = useNavigate()

  const navigateToCompany = (id) => {
    navigate(`/editCompany/${id}`)
  }

  const navigateToCreateCompany = () => {
    navigate(`/createCompany`)
  }

  const navigateToLocations = (id) => {
    navigate(`/companies/${id}`)
  }
  return (
    <Layout>
      <Header title={'Empresas'} />
      <Container>
        <CompaniesList>
          {companies.map((company) => (
            <Company
              key={company.id}
              company={company}
              navigateToCompany={navigateToCompany}
              navigateToLocations={navigateToLocations}
            />
          ))}
        </CompaniesList>
        <AddCompanyButton onClick={navigateToCreateCompany}>
          <AddCircleOutlineIcon sx={{ color: 'white' }} />
        </AddCompanyButton>
      </Container>
    </Layout>
  )
}
