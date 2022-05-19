import React from 'react'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { EditLocationForm } from './EditLocationForm/EditLocationForm'
import { ToastContainer } from 'react-toastify'

export const EditLocationPage = ({ location, navigateToLocations }) => {
  return (
    <Layout>
      <Header title={location.name} returnButton={navigateToLocations} />
      <Container>
        <EditLocationForm
          location={location}
          navigateToLocations={navigateToLocations}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}
