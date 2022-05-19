import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Ticket } from './Ticket/Ticket'
import { TicketsList } from './TicketsPage.styles'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { AddElementButton } from '../_shared/AddElementButton'

export const TicketsPage = ({ tickets }) => {
  let navigate = useNavigate()
  let { pathname } = useMatch('/companies/:companyId/:locationId')
  let { companyId } = useParams()

  const navigateToEditTicket = (id) => {
    navigate(`${pathname}/editTicket/${id}`)
  }

  const navigateToCreateTicket = () => {
    navigate(`${pathname}/createTicket`)
  }

  const navigateToLocations = () => {
    navigate(`/companies/${companyId}`)
  }

  return (
    <Layout>
      <Header title={'Tickets'} returnButton={navigateToLocations} />
      <Container>
        <TicketsList>
          {tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              navigateToEditTicket={navigateToEditTicket}
            />
          ))}
        </TicketsList>
        <AddElementButton onClick={navigateToCreateTicket} />
      </Container>
    </Layout>
  )
}
