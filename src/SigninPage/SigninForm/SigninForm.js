import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveTokens } from '../../AuthTokens/saveTokens'
import { toastConfig } from '../../_shared/toastConfig'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import {
  Form,
  FormText,
  StyledButton,
  StyledTextField,
  Wrapper,
} from './SigninForm.styles'

export const SigninForm = ({ toggleShowSignupForm }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const handleChange = (userPropName) => (e) => {
    const newUser = { ...user }
    newUser[userPropName] = e.target.value
    setUser(newUser)
  }

  let navigate = useNavigate()

  const navigateToCompanies = () => {
    navigate('/companies')
  }

  const submitSignIn = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.accessToken) {
          saveTokens(json.accessToken)
          navigateToCompanies()
          window.location.reload()
        } else {
          toast.error('Usuário ou senha incorreta')
        }
      })
      .catch((error) => toast.error(error.message, toastConfig))
  }

  return (
    <Wrapper>
      <Form onSubmit={submitSignIn}>
        <StyledTextField
          type='text'
          autoCapitalize='none'
          variant='outlined'
          label='Usuário'
          value={user.username}
          onChange={handleChange('username')}
        />
        <StyledTextField
          type='password'
          variant='outlined'
          label='Senha'
          value={user.password}
          onChange={handleChange('password')}
        />
        <StyledButton type='submit' variant='contained' id='submitSignInButton'>
          Entrar
        </StyledButton>
        <ToastContainer />
      </Form>
      <FormText onClick={toggleShowSignupForm}>
        Não possui uma conta? Registre-se
      </FormText>
    </Wrapper>
  )
}
