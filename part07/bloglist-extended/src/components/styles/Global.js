import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    font-size: 1.15em;
    margin: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }  
`

export default GlobalStyles
