import React from 'react'
import { EditButton } from '../../_shared/EditButton'
import { LocationName, Wrapper } from './Location.styles'

export const Location = ({
  location,
  navigateToEditLocation,
  navigateToTickets,
}) => {
  return (
    <Wrapper>
      <LocationName onClick={() => navigateToTickets(location.id)}>
        {location.name}
      </LocationName>
      <EditButton onClick={() => navigateToEditLocation(location.id)} />
    </Wrapper>
  )
}
