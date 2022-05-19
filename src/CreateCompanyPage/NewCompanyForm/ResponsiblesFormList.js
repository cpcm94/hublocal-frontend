import React, { useCallback } from 'react'
import { StyledButton } from './NewCompanyForm.styles'
import { ResponsibleForm } from './ResponsibleForm/ResponsibleForm'

export const ResponsiblesFormList = ({ responsibles, setResponsibles }) => {
  const updateResponsibles = useCallback(
    (index, newResponsible) => {
      const updatedResponsibles = [...responsibles]
      updatedResponsibles[index] = newResponsible
      setResponsibles(updatedResponsibles)
    },
    [responsibles, setResponsibles]
  )

  const deleteResponsible = (index) => {
    if (responsibles.length === 1) return

    const updatedResponsibles = [...responsibles]
    updatedResponsibles.splice(index, 1)
    setResponsibles(updatedResponsibles)
  }
  const addResponsible = () => {
    const updatedResponsibles = [
      ...responsibles,
      { name: '', address: '', contact_number: '', CEP: '' },
    ]
    setResponsibles(updatedResponsibles)
  }

  return (
    <>
      {responsibles.map((responsible, index) => (
        <ResponsibleForm
          key={index}
          responsible={responsible}
          updateResponsibles={(newResponsible) =>
            updateResponsibles(index, newResponsible)
          }
          deleteResponsible={() => deleteResponsible(index)}
          disableDelete={responsibles.length === 1}
          index={index}
        />
      ))}
      <StyledButton variant='contained' onClick={addResponsible}>
        Adicionar Responsável
      </StyledButton>
    </>
  )
}
