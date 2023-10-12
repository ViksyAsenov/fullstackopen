import styled from 'styled-components'

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.footer};
  padding: 40px;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 24px;
  }
`
