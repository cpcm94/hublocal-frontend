import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LocationsLoader } from './LocationsLoader'

export const LocationsRoute = () => {
  return (
    <Routes>
      <Route path={`/:companyId`} element={<LocationsLoader />} />
    </Routes>
  )
}
