import styled from 'styled-components'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
export const StyledTextField = styled(TextField)`
  margin: 0.75rem 0 !important;

  label.Mui-focused {
    color: var(--primary-color);
  }

  .MuiSelect-root {
    min-width: 30px;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: var(--primary-color);
    }
    &.Mui-focused fieldset {
      border-color: var(--primary-color);
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1.25rem;
`
export const StyledButton = styled(Button)`
  height: 3.5rem;
  width: 14rem;
  margin-top: 1rem !important;
  align-self: center;
  && {
    color: white;
  }
  &.MuiButton-contained {
    background-color: var(--primary-color);
  }
  &&:hover {
    background-color: #9c2d41;
  }
`
export const DeleteButton = styled(Button)`
  height: 3.5rem;
  width: 5rem;
  align-self: center;
  && {
    color: white;
    margin: 3rem 0 2rem 0;
  }
  &.MuiButton-contained {
    background-color: var(--primary-color);
  }
  &&:hover {
    background-color: #9c2d41;
  }
`
export const Label = styled.label`
  font-weight: bold;
`

export const UpdatedInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  margin-top: 1rem;
`
