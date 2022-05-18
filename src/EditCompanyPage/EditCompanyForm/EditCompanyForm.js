import React, { useState } from 'react'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
} from './EditCompanyForm.styles'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'

export const EditCompanyForm = ({ company }) => {
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

  const disableSubmitButton = companyData.name.trim() === ''
  //   const submitSaveUser = () => {
  //     saveUser().then((res) => {
  //       if (res.data.updateUser) {
  //         return toast.success('Alterações salvas com sucesso!', toastConfig)
  //       } else if (res.errors.message.startsWith('Validation')) {
  //         toast.error('Esse email já está cadastrado', toastConfig)
  //       } else {
  //         return toast.error(
  //           'Falha ao atualizar informações de usuário',
  //           toastConfig
  //         )
  //       }
  //     })
  //   }
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
      <>
        {company.Responsibles.map((responsible) => (
          <>
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
          </>
        ))}
      </>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <StyledButton disabled={disableSubmitButton} variant='contained'>
          Salvar alterações
        </StyledButton>
      )}
    </Wrapper>
  )
}
