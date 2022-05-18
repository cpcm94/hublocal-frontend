import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { EditCompanyLoader } from './EditCompanyLoader'

export const EditCompanyPage = () => {
  return (
    <Routes>
      <Route path={`/:companyId`} element={<EditCompanyLoader />} />
    </Routes>
  )
}
