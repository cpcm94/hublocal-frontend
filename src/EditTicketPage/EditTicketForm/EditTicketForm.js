import React, { useState } from 'react'
import {
  DeleteButton,
  Label,
  StyledButton,
  StyledTextField,
  UpdatedInfoWrapper,
  Wrapper,
} from './EditTicketForm.styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { getTokens } from '../../AuthTokens/getTokens'
import { toastConfig } from '../../_shared/toastConfig'
import { toast } from 'react-toastify'
import { MenuItem } from '@mui/material'
import { LoadingSpinner } from '../../_shared/LoadingSpinner'

export const EditTicketForm = ({ ticket, users, navigateToTickets }) => {
  const user = getTokens()
  const [loading, setLoading] = useState(false)
  const [ticketData, setTicketData] = useState({
    responder: ticket.responder,
    status: ticket.status,
  })

  const handleChange = (ticketPropName) => (e) => {
    const newTicket = { ...ticketData }
    newTicket[ticketPropName] = e.target.value
    setTicketData(newTicket)
  }

  const ticketCreator = users.filter(
    (user) => `${user.id}` === `${ticket.creator}`
  )[0]

  const ticketResponder = users.filter(
    (user) => `${user.id}` === `${ticketData.responder}`
  )[0]

  const createdAtDate = new Date(ticket.createdAt).toLocaleString()
  const updatedAtDate = new Date(ticket.updatedAt).toLocaleString()

  const onDelete = () => {
    setLoading(true)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/tickets/${ticket.id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': user,
      },
    })
      .then(() => navigateToTickets())
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }

  const onTicketUpdate = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/tickets/${ticket.id}`, {
      method: 'PUT',
      headers: {
        'x-access-token': user,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: ticket.id,
        title: ticket.title,
        status: ticketData.status,
        responder: ticketData.responder,
        updated_info: ticket.updated_info,
        location_id: ticket.LocationId,
      }),
    })
      .then(() => {
        navigateToTickets()
      })
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }

  const onExecuteChangesToLocation = () => {
    setLoading(true)

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/locations/${ticket.LocationId}`,
      {
        method: 'PUT',
        headers: {
          'x-access-token': user,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ticket.updated_info.name,
          main_responsible: ticket.updated_info.main_responsible,
          address: ticket.updated_info.address,
        }),
      }
    )
      .then(() => {
        fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/api/tickets/${ticket.id}`,
          {
            method: 'PUT',
            headers: {
              'x-access-token': user,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: ticket.id,
              title: ticket.title,
              status: 'CONCLUÍDO',
              responder: ticketData.responder,
              updated_info: ticket.updated_info,
              location_id: ticket.LocationId,
            }),
          }
        )
        navigateToTickets()
      })

      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }
  return (
    <Wrapper>
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Usuário Criador'
        value={ticketCreator.username}
      />
      <StyledTextField
        select
        type='text'
        variant='outlined'
        label='Usuário Atendente'
        value={ticketResponder.id}
        onChange={handleChange('responder')}
      >
        {users.map((user, index) => (
          <MenuItem key={index} value={user.id}>
            {user.username}
          </MenuItem>
        ))}
      </StyledTextField>
      <StyledTextField
        select
        type='text'
        variant='outlined'
        label='Status do ticket'
        value={ticketData.status}
        onChange={handleChange('status')}
      >
        <MenuItem value={'PENDENTE'}>{'Pendente'}</MenuItem>
        <MenuItem value={'PROGRESSO'}>{'Progresso'}</MenuItem>
        <MenuItem value={'CONCLUÍDO'}>{'Concluído'}</MenuItem>
      </StyledTextField>
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Data de criação'
        value={createdAtDate}
      />
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Última atualização'
        value={updatedAtDate}
      />
      <UpdatedInfoWrapper>
        <Label>Informações atualizadas do Local</Label>
        <StyledTextField
          disabled
          type='text'
          variant='outlined'
          label='Local'
          value={ticket.updated_info.name}
        />
        <StyledTextField
          disabled
          type='text'
          variant='outlined'
          label='Endereço'
          value={ticket.updated_info.address}
        />
        <StyledTextField
          disabled
          variant='outlined'
          label='Responsável Principal'
          value={ticket.updated_info.main_responsible}
        />
      </UpdatedInfoWrapper>

      {loading ? (
        <LoadingSpinner isLoading={loading} />
      ) : (
        <>
          <StyledButton variant='contained' onClick={onTicketUpdate}>
            Salvar ticket
          </StyledButton>
          <StyledButton
            variant='contained'
            onClick={onExecuteChangesToLocation}
          >
            Atualizar local
          </StyledButton>
          <DeleteButton variant='contained' onClick={onDelete}>
            <DeleteIcon sx={{ width: '2.25rem', height: '2.25rem' }} />
          </DeleteButton>
        </>
      )}
    </Wrapper>
  )
}
