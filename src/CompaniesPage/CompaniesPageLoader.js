import React, { useCallback, useEffect, useState } from 'react'
import { CompaniesPage } from './CompaniesPage'

import { getTokens } from '../AuthTokens/getTokens'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../_shared/LoadingSpinner'

export const CompaniesPageLoader = () => {
  const user = getTokens()
  const [companies, setCompanies] = useState(null)
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/companies`, {
      method: 'GET',
      headers: {
        'x-access-token': user,
      },
    })
      .then((response) => response.json())
      .then((json) => setCompanies(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [navigateToHome, user])

  return (
    <>
      {loading ? (
        <LoadingSpinner isLoading={loading} />
      ) : (
        <CompaniesPage companies={companies} />
      )}
    </>
  )
}
