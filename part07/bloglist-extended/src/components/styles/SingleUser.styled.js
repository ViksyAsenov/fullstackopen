import styled from 'styled-components'

export const SingleUserContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 1em;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkBody};
  color: ${({ theme }) => theme.colors.lightText};

  h1 {
    text-align: center;
  }
`

export const SingleUserUl = styled.ul`
  list-style: none;
  padding: 0;
`

export const SingleUserLi = styled.li`
  border: 2px solid ${({ theme }) => theme.colors.darkBody};
  background-color: ${({ theme }) => theme.colors.lightBody};
  color: ${({ theme }) => theme.colors.darkText};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 5px;
  padding: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBody};
    border-color: ${({ theme }) => theme.colors.lightBody};
    color: ${({ theme }) => theme.colors.lightText};
  }
`
