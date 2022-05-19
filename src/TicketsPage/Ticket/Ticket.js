import React from 'react'
import { StatusWrapper, TicketName, Wrapper } from './Ticket.styles'
import CachedIcon from '@mui/icons-material/Cached'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

export const Ticket = ({ ticket, navigateToEditTicket }) => {
  const Icon = () => {
    if (ticket.status === 'PENDENTE') return <CloseIcon />

    if (ticket.status === 'PROGRESSO') return <CachedIcon />

    return <CheckIcon />
  }
  return (
    <Wrapper>
      <TicketName onClick={() => navigateToEditTicket(ticket.id)}>
        {ticket.title}
        <StatusWrapper status={ticket.status}>{Icon()}</StatusWrapper>
      </TicketName>
    </Wrapper>
  )
}
