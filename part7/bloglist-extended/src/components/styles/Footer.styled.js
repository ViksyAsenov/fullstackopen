import styled from 'styled-components'

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.footer};
  padding: 40px;
  margin-top: 1em;

  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.header};
    margin: 0;
    font-size: 24px;
  }
`
