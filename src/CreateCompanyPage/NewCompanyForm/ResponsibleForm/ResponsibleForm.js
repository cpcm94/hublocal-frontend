import React, { useEffect, useRef, useState } from 'react'
import { StyledTextField } from '../NewCompanyForm.styles'
import { DeleteButton, Label, Wrapper } from './ResponsibleForm.styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import { toastConfig } from '../../../_shared/toastConfig'

export const ResponsibleForm = ({
  responsible,
  updateResponsibles,
  deleteResponsible,
  disableDelete,
  index,
}) => {
  const [responsibleData, setResponsibleData] = useState({
    name: responsible.name,
    CEP: responsible.CEP,
    contact_number: responsible.contact_number,
    address: responsible.adress,
  })
  const [addressFields, setAddressFields] = useState({
    address: '',
    state: '',
    city: '',
    district: '',
  })

  const handleChange = (responsiblePropName) => (e) => {
    const newResponsible = { ...responsibleData }
    newResponsible[responsiblePropName] = e.target.value
    setResponsibleData(newResponsible)
    updateResponsibles(newResponsible)
  }
  const lastRunCEP = useRef(false)
  useEffect(() => {
    if (responsible.CEP.length < 8) return

    if (isNaN(responsible.CEP)) return

    if (lastRunCEP.current === responsible.CEP) return

    fetch(
      `https://ws.apicep.com/cep/${responsible.CEP.substring(
        0,
        5
      )}-${responsible.CEP.substring(5)}.json`,
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
          const newResponsible = { ...responsibleData }
          newResponsible[
            'address'
          ] = `${json.state} - ${json.city} - ${json.district} - ${json.address}`
          setResponsibleData(newResponsible)
          updateResponsibles(newResponsible)
        } else {
          toast.error(json.message, toastConfig)
          setAddressFields({
            address: '',
            state: '',
            city: '',
            district: '',
          })
          const newResponsible = { ...responsibleData }
          newResponsible['address'] = 'teste'
          setResponsibleData(newResponsible)
          updateResponsibles(newResponsible)
        }
      })
      .catch((error) => {
        toast.error(error.message, toastConfig)
      })
      .finally(() => {
        lastRunCEP.current = responsible.CEP
      })
  }, [responsible.CEP, responsibleData, updateResponsibles])

  return (
    <Wrapper>
      <Label>{`Responsável ${index + 1}`}</Label>
      <StyledTextField
        type='text'
        variant='outlined'
        label='Nome'
        value={responsible.name}
        onChange={handleChange('name')}
      />
      <StyledTextField
        type='text'
        variant='outlined'
        label='CEP'
        inputProps={{ maxLength: 8 }}
        value={responsible.CEP}
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
        type='text'
        variant='outlined'
        label='Telefone'
        value={responsible.contact_number}
        onChange={handleChange('contact_number')}
      />
      <DeleteButton disabled={disableDelete} onClick={deleteResponsible}>
        <DeleteIcon />
      </DeleteButton>
    </Wrapper>
  )
}
