import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CompaniesPageLoader } from './CompaniesPage/CompaniesPageLoader'
import { CreateCompanyPage } from './CreateCompanyPage/CreateCompanyPage'
import { CreateLocationPage } from './CreateLocationPage/CreateLocationPage'
import { EditCompanyPage } from './EditCompanyPage/EditCompanyPage'
import { LocationsRoute } from './LocationsPage/LocationsRoute'
import { SigninPageLoader } from './SigninPage/SigninPageLoader'
import { TicketsRoute } from './TicketsPage/TicketsRoute'

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/editCompany/*' element={<EditCompanyPage />} />
          <Route path='/createCompany' element={<CreateCompanyPage />} />
          <Route path='/companies' element={<CompaniesPageLoader />} />
          <Route path='/companies/*' element={<LocationsRoute />} />
          <Route
            path='/companies/:companyId/createLocation'
            element={<CreateLocationPage />}
          />
          <Route path='/companies/:companyId/*' element={<TicketsRoute />} />
          <Route path='/' element={<SigninPageLoader />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
