import React, { useCallback, useEffect, useState } from 'react'
import { LocationsPage } from './LocationsPage'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'

export const LocationsLoader = () => {
  let { companyId } = useParams()

  const user = getTokens()
  const [locations, setLocations] = useState(null)
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/locations`, {
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
      .then((json) => setLocations(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [companyId, navigateToHome, user])

  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <LocationsPage locations={locations} />
      )}
    </>
  )
}
