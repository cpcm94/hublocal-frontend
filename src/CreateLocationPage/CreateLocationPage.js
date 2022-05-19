import React from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CreateLocationForm } from './CreateLocationForm/CreateLocationForm'

export const CreateLocationPage = () => {
  let { companyId } = useParams()
  let navigate = useNavigate()

  const navigateToLocations = () => {
    navigate(`/companies/${companyId}`)
  }

  return (
    <Layout>
      <Header title={'Criação de local'} returnButton={navigateToLocations} />
      <Container>
        <CreateLocationForm
          companyId={companyId}
          navigateToLocations={navigateToLocations}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}
