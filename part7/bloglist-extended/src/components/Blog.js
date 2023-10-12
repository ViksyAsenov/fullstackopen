import { Link } from 'react-router-dom'
import { BlogContainer } from './styles/Blog.styled'
const Blog = ({ blog }) => {
  return (
    <BlogContainer>
      <p>
        <Link className="blogLink" to={`/${blog.id}`}>
          {blog.title} | {blog.author}{' '}
        </Link>
      </p>
    </BlogContainer>
  )
}

export default Blog
