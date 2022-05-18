import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CompaniesPageLoader } from './CompaniesPage/CompaniesPageLoader'
import { SigninPageLoader } from './SigninPage/SigninPageLoader'

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/' element={<SigninPageLoader />} />
        </Routes>
        <Routes>
          <Route path='/companies' element={<CompaniesPageLoader />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
