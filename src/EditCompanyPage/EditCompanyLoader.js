import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'
import { EditableCompany } from './EditableCompany'

export const EditCompanyLoader = () => {
  let { companyId } = useParams()
  const user = getTokens()

  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (!user) navigateToHome()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/companies/${companyId}`, {
      method: 'GET',
      headers: {
        'x-access-token': user,
      },
    })
      .then((response) => response.json())
      .then((json) => setCompany(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [companyId, navigateToHome, user])

  return loading ? (
    <span>Loading...</span>
  ) : (
    <EditableCompany company={company} />
  )
}
