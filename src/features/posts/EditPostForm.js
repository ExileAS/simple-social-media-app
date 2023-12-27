import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postUpdated, selectPostById } from './PostsSlice'
import { useHistory } from 'react-router-dom'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleUpdateClicked = () => {
    if (title && content) {
      dispatch(postUpdated(postId, title, content))
      history.push('/posts/' + postId)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form name="edit-post">
        <label htmlFor="title">Post title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="what's on your mind?"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="content">Post content:</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <button type="button" onClick={handleUpdateClicked}>
          Save
        </button>
      </form>
    </section>
  )
}
