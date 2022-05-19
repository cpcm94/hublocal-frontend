import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Location } from './Location/Location'
import { LocationsList } from './LocationsPage.styles'
import { useMatch, useNavigate } from 'react-router-dom'
import { AddElementButton } from '../_shared/AddElementButton'

export const LocationsPage = ({ locations }) => {
  let navigate = useNavigate()
  let { pathname } = useMatch('/companies/:companyId')

  const navigateToEditLocation = (id) => {
    navigate(`${pathname}/editLocation/${id}`)
  }

  const navigateToCreateLocation = () => {
    navigate(`${pathname}/createLocation`)
  }

  const navigateToCompanies = () => {
    navigate('/companies')
  }

  const navigateToTickets = (id) => {
    navigate(`${pathname}/${id}`)
  }
  return (
    <Layout>
      <Header title={'Locais'} returnButton={navigateToCompanies} />
      <Container>
        <LocationsList>
          {locations.map((location) => (
            <Location
              key={location.id}
              location={location}
              navigateToEditLocation={navigateToEditLocation}
              navigateToTickets={navigateToTickets}
            />
          ))}
        </LocationsList>
        <AddElementButton onClick={navigateToCreateLocation} />
      </Container>
    </Layout>
  )
}
