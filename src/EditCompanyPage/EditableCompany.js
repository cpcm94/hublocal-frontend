import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { EditCompanyForm } from './EditCompanyForm/EditCompanyForm'

export const EditableCompany = ({ company }) => {
  let navigate = useNavigate()

  const navigateToCompanies = () => {
    navigate('/companies')
  }

  return (
    <Layout>
      <Header title={company.name} returnButton={navigateToCompanies} />
      <Container>
        <EditCompanyForm company={company} />
      </Container>
    </Layout>
  )
}
