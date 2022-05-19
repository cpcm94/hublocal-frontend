import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TicketsLoader } from './TicketsLoader'

export const TicketsRoute = () => {
  return (
    <Routes>
      <Route path={`/:locationId`} element={<TicketsLoader />} />
    </Routes>
  )
}
