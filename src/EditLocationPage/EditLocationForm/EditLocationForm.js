import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
  ResponsiblesWrapper,
  Label,
  DeleteButton,
} from './EditLocationForm.styles'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'
import { getTokens } from '../../AuthTokens/getTokens'
import { toastConfig } from '../../_shared/toastConfig'
import DeleteIcon from '@mui/icons-material/Delete'
import { v4 as uuidv4 } from 'uuid'
import { LoadingSpinner } from '../../_shared/LoadingSpinner'

export const EditLocationForm = ({ location, navigateToLocations }) => {
  const user = getTokens()

  const [locationData, setLocationData] = useState({
    address: location.address,
    name: location.name,
    main_responsible: location.main_responsible,
    CEP: '',
  })
  const splitAddress = location.address.split(' - ')
  const [addressFields, setAddressFields] = useState({
    address: splitAddress[3],
    state: splitAddress[0],
    city: splitAddress[1],
    district: splitAddress[2],
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (locationPropName) => (e) => {
    const newLocation = { ...locationData }
    newLocation[locationPropName] = e.target.value
    setLocationData(newLocation)
  }

  const disableSubmitButton =
    locationData.name.trim() === '' ||
    locationData.address.trim() === '' ||
    locationData.main_responsible.trim() === ''

  const hasPendingOrInProgressTickets = !!location.Tickets.filter(
    (ticket) => ticket.status !== 'CONCLUÍDO'
  )[0]

  const openTicket = location.Tickets.filter(
    (ticket) => ticket.status !== 'CONCLUÍDO'
  )[0]

  const onSubmit = () => {
    setLoading(true)
    if (hasPendingOrInProgressTickets) {
      fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/tickets/${openTicket.id}`,
        {
          method: 'PUT',
          headers: {
            'x-access-token': user,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: openTicket.id,
            title: openTicket.title,
            status: openTicket.status,
            responder: openTicket.responder,
            updated_info: {
              address: locationData.address,
              name: locationData.name,
              main_responsible: locationData.main_responsible,
            },
            location_id: location.id,
          }),
        }
      )
        .then(() => toast.success('Ticket atualizado com sucesso', toastConfig))
        .catch((error) => toast.error(error.message, toastConfig))
        .finally(() => setLoading(false))
    } else {
      const ticketId = uuidv4()
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/tickets/createTicket`, {
        method: 'POST',
        headers: {
          'x-access-token': user,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ticketId,
          title: `${ticketId}_${location.name}`,
          status: 'PENDENTE',
          updated_info: {
            address: locationData.address,
            name: locationData.name,
            main_responsible: locationData.main_responsible,
          },
          location_id: location.id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.message) {
            toast.success('Ticket criado com sucesso', toastConfig)
          } else {
            toast.error(json.message, toastConfig)
          }
        })
        .catch((error) => toast.error(error.message, toastConfig))
        .finally(() => setLoading(false))
    }
  }

  const onDelete = () => {
    setLoading(true)

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/locations/${location.id}`,
      {
        method: 'DELETE',
        headers: {
          'x-access-token': user,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        toast.success(json.message, toastConfig)
        navigateToLocations()
      })
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }

  const lastRunCEP = useRef(false)

  useEffect(() => {
    if (locationData.CEP.length < 8) return

    if (isNaN(locationData.CEP)) return

    if (lastRunCEP.current === locationData.CEP) return

    fetch(
      `https://ws.apicep.com/cep/${locationData.CEP.substring(
        0,
        5
      )}-${locationData.CEP.substring(5)}.json`,
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setAddressFields({
            address: json.address,
            state: json.state,
            city: json.city,
            district: json.district,
          })
          const newLocation = { ...locationData }
          newLocation[
            'address'
          ] = `${json.state} - ${json.city} - ${json.district} - ${json.address}`
          setLocationData(newLocation)
        } else {
          toast.error(json.message, toastConfig)
          setAddressFields({
            address: '',
            state: '',
            city: '',
            district: '',
          })
          const newLocation = { ...locationData }
          newLocation['address'] = ''
          setLocationData(newLocation)
        }
      })
      .catch((error) => {
        toast.error(error.message, toastConfig)
      })
      .finally(() => {
        lastRunCEP.current = locationData.CEP
      })
  }, [locationData])

  return (
    <Wrapper>
      <StyledTextField
        type='text'
        variant='outlined'
        label='Local'
        value={locationData.name}
        onChange={handleChange('name')}
      />
      <StyledTextField
        type='text'
        variant='outlined'
        inputProps={{ maxLength: 8 }}
        label='CEP'
        value={locationData.CEP}
        onChange={handleChange('CEP')}
      />
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Estado'
        value={addressFields.state}
      />
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Cidade'
        value={addressFields.city}
      />
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Bairro'
        value={addressFields.district}
      />
      <StyledTextField
        disabled
        type='text'
        variant='outlined'
        label='Endereço'
        value={addressFields.address}
      />
      <StyledTextField
        select
        variant='outlined'
        label='Responsável Principal'
        value={locationData.main_responsible}
        onChange={handleChange('main_responsible')}
      >
        {location.Responsibles.map((responsible, index) => (
          <MenuItem key={index} value={responsible.name}>
            {responsible.name}
          </MenuItem>
        ))}
      </StyledTextField>
      {location.Responsibles.map((responsible, index) => (
        <Fragment key={index}>
          <Label>Responsável {index + 1}</Label>
          <ResponsiblesWrapper>
            <StyledTextField
              disabled
              type='text'
              variant='outlined'
              label='Responsável'
              value={responsible.name}
            />
            <StyledTextField
              disabled
              type='text'
              variant='outlined'
              label='Endereço'
              value={responsible.address}
            />
            <StyledTextField
              disabled
              type='text'
              variant='outlined'
              label='Telefone'
              value={responsible.contact_number}
            />
          </ResponsiblesWrapper>
        </Fragment>
      ))}
      {loading ? (
        <LoadingSpinner isLoading={loading} />
      ) : (
        <>
          <StyledButton
            disabled={disableSubmitButton}
            variant='contained'
            onClick={onSubmit}
          >
            Salvar alterações
          </StyledButton>
          <DeleteButton variant='contained' onClick={onDelete}>
            <DeleteIcon sx={{ width: '2.25rem', height: '2.25rem' }} />
          </DeleteButton>
        </>
      )}
    </Wrapper>
  )
}
