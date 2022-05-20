import React, { useState } from 'react'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
} from './SignupForm.styles'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastConfig } from '../../_shared/toastConfig'
import { LoadingSpinner } from '../../_shared/LoadingSpinner'

export const SignupForm = ({ toggleShowSignupForm }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleChange = (userPropName) => (e) => {
    const newUser = { ...user }
    newUser[userPropName] = e.target.value
    setUser(newUser)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = () => {
    if (confirmPassword !== user.password) {
      toast.error('Os dois campos de senha precisam ser iguais!', toastConfig)
    } else {
      setLoading(true)
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            toggleShowSignupForm()
            toast.success('Usuário criado com sucesso', toastConfig)
          } else {
            res.json().then((json) => toast.error(json.message))
          }
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
        })
        .finally(() => setLoading(false))
    }
  }

  const disableSubmitButton =
    user.password === '' ||
    user.password.length !== confirmPassword.length ||
    user.username === ''
  return (
    <Wrapper>
      <Form>
        <StyledTextField
          type='text'
          variant='outlined'
          label='Nome'
          onChange={handleChange('username')}
        />
        <StyledTextField
          type='password'
          variant='outlined'
          label='Senha'
          onChange={handleChange('password')}
        />
        <StyledTextField
          type='password'
          variant='outlined'
          label='Confirme a senha'
          onChange={handleConfirmPasswordChange}
        />
        {loading ? (
          <LoadingSpinner isLoading={loading} />
        ) : (
          <StyledButton
            disabled={disableSubmitButton}
            variant='contained'
            id='submitCreateButton'
            onClick={handleSubmit}
          >
            Criar Conta
          </StyledButton>
        )}
      </Form>
    </Wrapper>
  )
}
