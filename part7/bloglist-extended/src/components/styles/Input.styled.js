import styled from 'styled-components'

export const Input = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.colors.lightBody};
  border: 2px solid ${({ theme }) => theme.colors.darkBody};
  color: ${({ theme }) => theme.colors.darkText};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.lightText};
    background-color: ${(props) => props.theme.colors.darkBody};
    border-color: ${({ theme }) => theme.colors.lightBody};
  }
`
