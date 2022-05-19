import React from 'react'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { EditTicketForm } from './EditTicketForm/EditTicketForm'
import { ToastContainer } from 'react-toastify'

export const EditTicketPage = ({ ticket, users, navigateToTickets }) => {
  return (
    <Layout>
      <Header title={ticket.title} returnButton={navigateToTickets} />
      <Container>
        <EditTicketForm
          ticket={ticket}
          users={users}
          navigateToTickets={navigateToTickets}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}
