import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'
import { LoadingSpinner } from '../_shared/LoadingSpinner'
import { EditTicketPage } from './EditTicketPage'

export const EditTicketLoader = () => {
  let { locationId, companyId, ticketId } = useParams()
  const user = getTokens()

  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(null)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  const navigateToTickets = () => {
    navigate(`/companies/${companyId}/${locationId}`)
  }

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/tickets/${ticketId}`, {
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
      .then((json) => setTicket(json))
      .catch((error) => console.log(error))

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/users`, {
      method: 'GET',
      headers: {
        'x-access-token': user,
      },
    })
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.log(error))
  }, [locationId, navigateToHome, ticketId, user])

  useEffect(() => {
    if (users && ticket) {
      setLoading(false)
    }
  }, [ticket, users])

  return loading ? (
    <LoadingSpinner isLoading={loading} />
  ) : (
    <EditTicketPage
      ticket={ticket}
      users={users}
      navigateToTickets={navigateToTickets}
    />
  )
}
