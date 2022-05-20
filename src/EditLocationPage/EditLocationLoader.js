import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'
import { LoadingSpinner } from '../_shared/LoadingSpinner'
import { EditLocationPage } from './EditLocationPage'

export const EditLocationLoader = () => {
  let { locationId, companyId } = useParams()
  const user = getTokens()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const navigateToLocations = () => {
    navigate(`/companies/${companyId}`)
  }

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/locations/${locationId}`, {
      method: 'POST',
      headers: {
        'x-access-token': user,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_id: companyId,
      }),
    })
      .then((response) => response.json())
      .then((json) => setLocation(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [companyId, locationId, navigateToHome, user])

  return loading ? (
    <LoadingSpinner isLoading={loading} />
  ) : (
    <EditLocationPage
      location={location}
      navigateToLocations={navigateToLocations}
    />
  )
}
