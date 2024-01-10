import styled from 'styled-components'

export const LoginFormContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 1em;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkBody};
  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.lightText};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  .inputDiv {
    color: ${({ theme }) => theme.colors.lightText};
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;

    #passwordToggleButton {
      position: absolute;
      padding: 2.5px 5px;
      top: 2.5px;
      right: 5px;
    }
  }

  .passwordContainer {
    position: relative;
  }
`
