import styled from 'styled-components'

export const UsersTable = styled.table`
  border: solid ${({ theme }) => theme.colors.darkBody};
  background-color: ${({ theme }) => theme.colors.lightBody};
  color: ${({ theme }) => theme.colors.darkText};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  width: 100%;
`

export const UsersTableTr = styled.tr`
  border: 2px solid ${({ theme }) => theme.colors.darkBody};
  background-color: ${({ theme }) => theme.colors.lightBody};
  color: ${({ theme }) => theme.colors.darkText};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  .userName {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.darkText};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBody};
    border-color: ${({ theme }) => theme.colors.lightBody};
    color: ${({ theme }) => theme.colors.lightText};

    .userName {
      color: ${({ theme }) => theme.colors.lightText};
    }
  }
`
