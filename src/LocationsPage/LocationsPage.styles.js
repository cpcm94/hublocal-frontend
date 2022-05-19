import styled from 'styled-components'

export const LocationsList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
export const AddLocationButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: #f6cbb7;
  cursor: pointer;
  :hover {
    background-color: var(--primary-color);
  }
`
