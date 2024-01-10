import styled from 'styled-components'

export const BlogFormContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 1em;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.darkBody};
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
  }
`
