import styled from 'styled-components'

export const BlogContainer = styled.div`
  padding-top: 10px;
  border: solid ${({ theme }) => theme.colors.darkBody};
  background-color: ${({ theme }) => theme.colors.lightBody};
  color: ${({ theme }) => theme.colors.darkText};
  border-width: 2px;
  margin-bottom: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  .blogLink {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.darkText};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBody};
    border-color: ${({ theme }) => theme.colors.lightBody};
    color: ${({ theme }) => theme.colors.lightText};

    .blogLink {
      color: ${({ theme }) => theme.colors.lightText};
    }
  }
`
