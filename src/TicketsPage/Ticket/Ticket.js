import React from 'react'
import { TicketName, Wrapper } from './Ticket.styles'

export const Ticket = ({ ticket, navigateToEditTicket }) => {
  return (
    <Wrapper>
      <TicketName onClick={() => navigateToEditTicket(ticket.id)}>
        {ticket.name}
      </TicketName>
    </Wrapper>
  )
}
