import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
`
export const LocationName = styled.div`
  flex: 1;
  padding: 1.25rem;

  :hover {
    background-color: #f6cbb7;
  }
`
export const EditButton = styled.div`
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem 
  max-height: 1.25rem;
  font-size: 0.5rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.75rem 1rem;
  :hover {
    background-color: #F6CBB7;
  }
`
