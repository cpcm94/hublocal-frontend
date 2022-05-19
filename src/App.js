import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CompaniesPageLoader } from './CompaniesPage/CompaniesPageLoader'
import { CreateCompanyPage } from './CreateCompanyPage/CreateCompanyPage'
import { CreateLocationPage } from './CreateLocationPage/CreateLocationPage'
import { EditCompanyPage } from './EditCompanyPage/EditCompanyPage'
import { EditLocationLoader } from './EditLocationPage/EditLocationLoader'
import { EditTicketLoader } from './EditTicketPage/EditTicketLoader'
import { LocationsLoader } from './LocationsPage/LocationsLoader'
import { SigninPageLoader } from './SigninPage/SigninPageLoader'
import { TicketsLoader } from './TicketsPage/TicketsLoader'

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/editCompany/*' element={<EditCompanyPage />} />
          <Route path='/createCompany' element={<CreateCompanyPage />} />
          <Route path='/companies' element={<CompaniesPageLoader />} />
          <Route path='/companies/:companyId' element={<LocationsLoader />} />
          <Route
            path='/companies/:companyId/createLocation'
            element={<CreateLocationPage />}
          />
          <Route
            path='/companies/:companyId/:locationId'
            element={<TicketsLoader />}
          />
          <Route
            path='/companies/:companyId/editLocation/:locationId'
            element={<EditLocationLoader />}
          />
          <Route
            path='/companies/:companyId/:locationId/editTicket/:ticketId'
            element={<EditTicketLoader />}
          />
          <Route path='/' element={<SigninPageLoader />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
