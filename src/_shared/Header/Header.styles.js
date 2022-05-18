import styled from 'styled-components'

export const Title = styled.div`
  font-size: 1.1rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  align-self: center;
  padding-left: ${({ returnButton }) => returnButton && '1.25rem'};
`
export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: fixed;
  top: 0;
  height: 2.5rem;
  z-index: 2;
  overflow: hidden;
  padding-left: 1.25rem;
`
