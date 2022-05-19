import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
`
export const TicketName = styled.div`
  display: flex;
  flex: 1;
  padding: 1.25rem;

  :hover {
    background-color: #f6cbb7;
  }
`
export const StatusWrapper = styled.div`
  margin-top: -1px;
  margin-left: 0.5rem;
  color: ${({ status }) =>
    status === 'CONCLUÍDO'
      ? 'green'
      : status === 'PENDENTE'
      ? 'red'
      : 'orange'};
`
