import styled from 'styled-components'

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkBody};
  color: ${({ theme }) => theme.colors.lightText};
  padding: 20px;
  margin-bottom: 1em;
  font-size: 16px;

  .Link {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightText};
    margin-right: 20px;
  }
`
