import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CompaniesPageLoader } from './CompaniesPage/CompaniesPageLoader'
import { CreateCompanyPage } from './CreateCompanyPage/CreateCompanyPage'
import { EditCompanyPage } from './EditCompanyPage/EditCompanyPage'
import { SigninPageLoader } from './SigninPage/SigninPageLoader'

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/editCompany/*' element={<EditCompanyPage />} />
          <Route path='/createCompany' element={<CreateCompanyPage />} />
          <Route path='/companies' element={<CompaniesPageLoader />} />
          <Route path='/' element={<SigninPageLoader />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
