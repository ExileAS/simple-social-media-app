import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from '../users/PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectPostById } from './PostsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  return post ? (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content.substring(0, 100)}</p>
        <br />
        <PostAuthor userId={post.user} />
        <br />
        <TimeAgo timestamp={post.date} />
        <br />
        <ReactionButtons post={post} />
        <br />
        <br />
        <Link to={`/editPost/${post.id}`}>
          <button>Edit Post</button>
        </Link>
      </article>
    </section>
  ) : (
    <section>
      <article>
        <h2>post not found</h2>
        <Link to={'/'}>Back to homepage</Link>
      </article>
    </section>
  )
}
