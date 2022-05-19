import React, { useEffect, useRef, useState } from 'react'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
} from './CreateLocationForm.styles'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'
import { toastConfig } from '../../_shared/toastConfig'
import { getTokens } from '../../AuthTokens/getTokens'
import { ResponsiblesFormList } from '../../_shared/ResponsibleForm/ResponsiblesFormList'

export const CreateLocationForm = ({ navigateToLocations, companyId }) => {
  const user = getTokens()
  const [locationData, setLocationData] = useState({
    name: '',
    main_responsible: '',
    address: '',
    CEP: '',
  })
  const [responsibles, setResponsibles] = useState([
    {
      name: '',
      CEP: '',
      address: '',
      contact_number: '',
    },
  ])
  const [addressFields, setAddressFields] = useState({
    address: '',
    state: '',
    city: '',
    district: '',
  })
  const lastRunCEP = useRef(false)

  const [loading, setLoading] = useState(false)
  const handleChange = (locationPropName) => (e) => {
    const newLocation = { ...locationData }
    newLocation[locationPropName] = e.target.value
    setLocationData(newLocation)
  }

  const disableSubmitButton =
    locationData.name.trim() === '' ||
    locationData.address.trim() === '' ||
    locationData.main_responsible.trim() === '' ||
    !!responsibles.filter(
      (responsible) =>
        responsible.name.trim() === '' ||
        responsible.CEP.trim() === '' ||
        responsible.address.trim() === ''
    )[0]

  const onSubmit = () => {
    setLoading(true)

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/locations/createLocation`,
      {
        method: 'POST',
        headers: {
          'x-access-token': user,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: locationData.name,
          main_responsible: locationData.main_responsible,
          address: locationData.address,
          company_id: companyId,
          responsibles: responsibles,
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.message) {
          toast.success('Local criado com sucesso', toastConfig)
          navigateToLocations()
        } else {
          toast.error(json.message, toastConfig)
        }
      })
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }

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
        {responsibles.map((responsible, index) => (
          <MenuItem key={index} value={responsible.name}>
            {responsible.name}
          </MenuItem>
        ))}
      </StyledTextField>
      <ResponsiblesFormList
        responsibles={responsibles}
        setResponsibles={setResponsibles}
      />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <StyledButton
          disabled={disableSubmitButton}
          variant='contained'
          onClick={onSubmit}
        >
          Salvar Local
        </StyledButton>
      )}
    </Wrapper>
  )
}
