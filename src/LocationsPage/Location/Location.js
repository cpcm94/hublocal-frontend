import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { LocationName, EditButton, Wrapper } from './Location.styles'

export const Location = ({
  location,
  navigateToEditLocation,
  navigateToLocations,
}) => {
  return (
    <Wrapper>
      <LocationName onClick={() => navigateToLocations(location.id)}>
        {location.name}
      </LocationName>
      <EditButton onClick={() => navigateToEditLocation(location.id)}>
        <EditIcon />
      </EditButton>
    </Wrapper>
  )
}
