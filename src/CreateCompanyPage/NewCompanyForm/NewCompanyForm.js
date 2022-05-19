import React, { useState } from 'react'
import { Wrapper, StyledTextField, StyledButton } from './NewCompanyForm.styles'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'
import { ResponsiblesFormList } from '../../_shared/ResponsibleForm/ResponsiblesFormList'
import { toastConfig } from '../../_shared/toastConfig'
import { getTokens } from '../../AuthTokens/getTokens'

export const NewCompanyForm = ({ navigateToCompanies }) => {
  const user = getTokens()
  const [companyData, setCompanyData] = useState({
    description: '',
    name: '',
    main_responsible: '',
    CNPJ: '',
  })
  const [responsibles, setResponsibles] = useState([
    {
      name: '',
      CEP: '',
      address: '',
      contact_number: '',
    },
  ])
  const [loading, setLoading] = useState(false)
  const handleChange = (companyPropName) => (e) => {
    const newCompany = { ...companyData }
    newCompany[companyPropName] = e.target.value
    setCompanyData(newCompany)
  }

  const disableSubmitButton =
    companyData.name.trim() === '' ||
    companyData.CNPJ.trim() === '' ||
    companyData.main_responsible.trim() === '' ||
    !!responsibles.filter(
      (responsible) =>
        responsible.name.trim() === '' ||
        responsible.CEP.trim() === '' ||
        responsible.address.trim() === ''
    )[0]

  const onSubmit = () => {
    setLoading(true)

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/companies/createCompany`, {
      method: 'POST',
      headers: {
        'x-access-token': user,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: companyData.description,
        name: companyData.name,
        main_responsible: companyData.main_responsible,
        CNPJ: companyData.CNPJ,
        responsibles: responsibles,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.message) {
          toast.success('Empresa criada com sucesso', toastConfig)
          navigateToCompanies()
        } else {
          toast.error(json.message, toastConfig)
        }
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
        inputProps={{ maxLength: 14 }}
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
          Salvar Empresa
        </StyledButton>
      )}
    </Wrapper>
  )
}
