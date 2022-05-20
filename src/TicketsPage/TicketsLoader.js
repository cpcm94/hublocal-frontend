import React, { useCallback, useEffect, useState } from 'react'
import { TicketsPage } from './TicketsPage'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'
import { LoadingSpinner } from '../_shared/LoadingSpinner'

export const TicketsLoader = () => {
  let { locationId } = useParams()

  const user = getTokens()
  const [tickets, setTickets] = useState(null)
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/tickets`, {
      method: 'POST',
      headers: {
        'x-access-token': user,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_id: locationId,
      }),
    })
      .then((response) => response.json())
      .then((json) => setTickets(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [locationId, navigateToHome, user])

  return (
    <>
      {loading ? (
        <LoadingSpinner isLoading={loading} />
      ) : (
        <TicketsPage tickets={tickets} />
      )}
    </>
  )
}
