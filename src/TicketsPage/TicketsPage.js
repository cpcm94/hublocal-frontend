import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Ticket } from './Ticket/Ticket'
import { TicketsList } from './TicketsPage.styles'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

export const TicketsPage = ({ tickets }) => {
  let navigate = useNavigate()
  let { pathname } = useMatch('/companies/:companyId/:locationId')
  let { companyId } = useParams()

  const navigateToEditTicket = (id) => {
    navigate(`${pathname}/editTicket/${id}`)
  }

  const navigateToLocations = () => {
    navigate(`/companies/${companyId}`)
  }
  const getSortedTickets = () => {
    let ordering = {}
    const sortOrder = ['PENDENTE', 'PROGRESSO', 'CONCLUÍDO']

    for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i

    return [...tickets].sort(function (a, b) {
      return ordering[a.status] - ordering[b.status]
    })
  }

  return (
    <Layout>
      <Header title={'Tickets'} returnButton={navigateToLocations} />
      <Container>
        <TicketsList>
          {getSortedTickets().map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              navigateToEditTicket={navigateToEditTicket}
            />
          ))}
        </TicketsList>
      </Container>
    </Layout>
  )
}
