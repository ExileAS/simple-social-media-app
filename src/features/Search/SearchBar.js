import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../posts/PostsSlice'
import { PostExcerpt } from '../posts/PostsList'

export const SearchBar = () => {
  const allPosts = useSelector(selectAllPosts)
  const [search, setSearch] = useState('')

  const handleSearch = (e) => setSearch(e.target.value)

  const filteredPosts = allPosts.filter((post) => {
    return (
      search !== '' && post.title.toLowerCase().includes(search.toLowerCase())
    )
  })

  const displayedPosts = filteredPosts.map((post) => {
    return <PostExcerpt key={post.id} postId={post.id} />
  })

  return (
    <div>
      <label>Search Posts:</label>
      <textarea
        name="searchbar"
        id="searchbar"
        value={search}
        onChange={handleSearch}
      ></textarea>
      {filteredPosts.length ? (
        <div>
          <label>
            <h4>Search Results:</h4>
          </label>{' '}
          {displayedPosts}
        </div>
      ) : (
        search.length > 0 && <div>no posts found</div>
      )}
    </div>
  )
}
