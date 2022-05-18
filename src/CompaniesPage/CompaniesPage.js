import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Company } from './Company/Company'
import { CompaniesList } from './CompaniesPage.styles'

export const CompaniesPage = ({ companies }) => {
  return (
    <Layout>
      <Header title={'Empresas'} />
      <Container>
        <CompaniesList>
          {companies.map((company) => (
            <Company key={company.id} company={company} />
          ))}
        </CompaniesList>
      </Container>
    </Layout>
  )
}
