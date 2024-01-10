import styled from 'styled-components'

export const SingleBlogContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 1em;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.darkBody};
  color: ${({ theme }) => theme.colors.lightText};

  h1 {
    text-align: center;
    margin-bottom: 1em;
  }

  #commentsDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 1em;
  }
`

export const SingleBlogForm = styled.form`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 1em;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.colors.lightBody};
  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.lightText};
  }

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

export const SingleBlogUl = styled.ul`
  list-style: none;
  padding: 0;
`

export const SingleBlogLi = styled.li`
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
