import React from 'react'
import { NewCompanyForm } from './NewCompanyForm/NewCompanyForm'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { getTokens } from '../AuthTokens/getTokens'

export const CreateCompanyPage = () => {
  const user = getTokens()

  let navigate = useNavigate()

  const navigateToCompanies = () => {
    navigate('/companies')
  }
  return (
    <Layout>
      <Header title={'Nova Empresa'} returnButton={navigateToCompanies} />
      <Container>
        <NewCompanyForm navigateToCompanies={navigateToCompanies} user={user} />
        <ToastContainer />
      </Container>
    </Layout>
  )
}
