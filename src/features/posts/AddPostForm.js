import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./PostsSlice";
import { selectAllUsers } from "../users/UsersSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);


  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const handlePostAdded = async () => {
      if(canSave) {
        try {
          setAddRequestStatus('pending');
          await dispatch(addNewPost({title, content, user:userId})).unwrap();
          setTitle('');
          setContent('');
          setUserId('');
        } catch(err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setAddRequestStatus('idle');
        }
      } 
      
  }

  const userOptions = users.map(user => (
      <option value={user.id} key={user.id}>
          {user.name}
      </option>
  ))


  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeContent = e => setContent(e.target.value);
  const handleChangeUser = e => setUserId(e.target.value);


  return (
      <section>
          <h2>Add a new post</h2>
          <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postTitle">post title:</label>
              <input 
              type="text" 
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={handleChangeTitle}
              />
              <label htmlFor="postContent"></label>
              <textarea 
              name="postContent"
              id="postContnt"
              value={content}
              onChange={handleChangeContent}
              ></textarea>
              <select id="postAuthor" value={userId} onChange={handleChangeUser}>
                  <option value=""></option>
                  {userOptions}
              </select>
              {addRequestStatus === 'idle' ? <button type="button" onClick={handlePostAdded} disabled={!canSave}>Save post</button> : <button disabled>Adding Post..</button>}
          </form>
      </section>
  )

}