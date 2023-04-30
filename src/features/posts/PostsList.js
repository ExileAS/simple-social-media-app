import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "../users/PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { fetchPosts,selectPostById,selectPostIds } from "./PostsSlice";

import { useEffect } from "react";
import {Spinner} from '../../components/Spinner';
import { SearchBar } from "../Search/SearchBar";
import React from "react";

export let PostExcerpt = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));
    return (
        <article className="post-excerpt" key={post.id}>
            <h2>{post.title}</h2>
            <p className="post-content">{post.content.substring(0,100)}</p>
            <br />
            <PostAuthor userId={post.user}/>
            <br />
            <TimeAgo timestamp={post.date}/>
            <br />
                <ReactionButtons post={post}/>
            <br />
            <br />
            <Link to={'/posts/' + post.id}>view post</Link>
            <br />
            <Link to={`/editPost/${post.id}`}><button>Edit Post</button></Link>
        </article>
    )
}

// PostExcerpt = React.memo(PostfffffExcerpt);

export const PostsList = () => {
    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.posts.status);
    const orderedPostIds = useSelector(selectPostIds);
    
    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
            // we dont use async await since we dont have any more steps to do here
        }
    },[dispatch, postStatus])

    
    const error = useSelector(state => state.error);

    let content;

    if(postStatus === 'loading') {
        content = <Spinner text="Loading..."/>;
    } else if(postStatus === 'succeeded') {
        content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId}/>);
    }else if(postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <SearchBar />
            <Link to='/posts/addPost'><button>Add a New Post</button></Link>
            <br />
            <br />
            <h2>All Posts:</h2>
            {content}
        </section>
    )
}
