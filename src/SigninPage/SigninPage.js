import React, { useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { SigninForm } from './SigninForm/SigninForm'
import { SignupForm } from './SignupForm/SignupForm'
import { Container } from '../_shared/Container'
import { ToastContainer } from 'react-toastify'

export const SigninPage = () => {
  const [showSignupForm, setShowSignupForm] = useState(false)

  const toggleShowSignupForm = () => {
    setShowSignupForm(!showSignupForm)
  }

  const titleText = showSignupForm ? 'Cria sua conta' : 'Entrar'

  return (
    <Layout>
      <Header title={titleText} />
      <Container>
        {showSignupForm ? (
          <SignupForm toggleShowSignupForm={toggleShowSignupForm} />
        ) : (
          <SigninForm toggleShowSignupForm={toggleShowSignupForm} />
        )}
        <ToastContainer />
      </Container>
    </Layout>
  )
}
