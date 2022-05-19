import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  margin-top: 1rem;
`
export const DeleteButton = styled.button`
  width: 5rem;
  padding: 0.25rem 0;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  align-self: center;
  cursor: ${({ disabled }) => disabled && 'cursor'};
  color: ${({ disabled }) => disabled && 'grey'};
`
export const Label = styled.label`
  margin-top: -0.5rem;
  font-weight: bold;
`
