import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Location } from './Location/Location'
import { AddLocationButton, LocationsList } from './LocationsPage.styles'
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const LocationsPage = ({ locations }) => {
  let navigate = useNavigate()

  const navigateToEditLocation = (id) => {
    navigate(`/editLocation/${id}`)
  }

  const navigateToCreateLocation = () => {
    navigate(`/createLocation`)
  }

  const navigateToCompanies = () => {
    navigate('/companies')
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
            />
          ))}
        </LocationsList>
        <AddLocationButton onClick={navigateToCreateLocation}>
          <AddCircleOutlineIcon sx={{ color: 'white' }} />
        </AddLocationButton>
      </Container>
    </Layout>
  )
}
