import React, { Fragment, useState } from 'react'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
  ResponsiblesWrapper,
  Label,
  DeleteButton,
} from './EditCompanyForm.styles'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'
import { getTokens } from '../../AuthTokens/getTokens'
import { toastConfig } from '../../_shared/toastConfig'
import DeleteIcon from '@mui/icons-material/Delete'

export const EditCompanyForm = ({ company, navigateToCompanies }) => {
  const user = getTokens()

  const [companyData, setCompanyData] = useState({
    description: company.description,
    name: company.name,
    main_responsible: company.main_responsible,
    CNPJ: company.CNPJ,
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (companyPropName) => (e) => {
    const newCompany = { ...companyData }
    newCompany[companyPropName] = e.target.value
    setCompanyData(newCompany)
  }

  const disableSubmitButton =
    companyData.name.trim() === '' ||
    companyData.CNPJ.trim() === '' ||
    companyData.main_responsible.trim() === ''

  const onSubmit = () => {
    setLoading(true)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/companies/${company.id}`, {
      method: 'PUT',
      headers: {
        'x-access-token': user,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: companyData.description,
        name: companyData.name,
        main_responsible: companyData.main_responsible,
        CNPJ: companyData.CNPJ,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.id) {
          toast.success('Alterações salvas com sucesso!', toastConfig)
        } else {
          toast.error(json.message, toastConfig)
        }
      })
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }

  const onDelete = () => {
    setLoading(true)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/companies/${company.id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': user,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        toast.success(json.message, toastConfig)
        navigateToCompanies()
      })
      .catch((error) => toast.error(error.message, toastConfig))
      .finally(() => setLoading(false))
  }
  return (
    <Wrapper>
      <StyledTextField
        type='text'
        variant='outlined'
        label='Empresa'
        value={companyData.name}
        onChange={handleChange('name')}
      />
      <StyledTextField
        type='text'
        variant='outlined'
        label='CNPJ'
        value={companyData.CNPJ}
        onChange={handleChange('CNPJ')}
      />
      <StyledTextField
        type='text'
        variant='outlined'
        label='Descrição'
        value={companyData.description}
        onChange={handleChange('description')}
      />
      <StyledTextField
        select
        variant='outlined'
        label='Responsável Principal'
        value={companyData.main_responsible}
        onChange={handleChange('main_responsible')}
      >
        {company.Responsibles.map((responsible, index) => (
          <MenuItem key={index} value={responsible.name}>
            {responsible.name}
          </MenuItem>
        ))}
      </StyledTextField>
      {company.Responsibles.map((responsible, index) => (
        <Fragment key={index}>
          <Label>Responsável {index + 1}</Label>
          <ResponsiblesWrapper>
            <StyledTextField
              type='text'
              variant='outlined'
              label='Responsável'
              value={responsible.name}
            />
            <StyledTextField
              type='text'
              variant='outlined'
              label='Endereço'
              value={responsible.address}
            />
            <StyledTextField
              type='text'
              variant='outlined'
              label='Telefone'
              value={responsible.contact_number}
            />
          </ResponsiblesWrapper>
        </Fragment>
      ))}
      {loading ? (
        <span>Loading...</span>
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
