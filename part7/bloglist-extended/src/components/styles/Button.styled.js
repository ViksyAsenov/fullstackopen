import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 50px;
  border: solid ${({ theme }) => theme.colors.darkBody};
  border-width: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 10px 25px;
  background-color: ${({ theme }) => theme.colors.lightBody};
  color: ${({ theme }) => theme.colors.darkText};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBody};
    color: ${({ theme }) => theme.colors.lightText};
    border-color: ${({ theme }) => theme.colors.lightBody};
  }
`
