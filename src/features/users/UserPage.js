import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostsByUser } from "../posts/PostsSlice";
import React from "react";
import { useHistory } from "react-router-dom";


export const UserPage = ({match}) => {
    const {userId} = match.params;
    let postsForUser = useSelector(state => selectPostsByUser(state,userId));
    const history = useHistory();


    const posts = postsForUser.map(post => (
        <article key={post.id}>
        <h2>{post.title}</h2>
        {post.content.length > 40 ? <p>{post.content.substring(0,40)}...</p> : <p>{post.content}</p>}
        <Link to={'/posts/' + post.id}><h4>View Full Post</h4></Link>
        <br />
    </article>
    ))

    if(!posts.length) {
        history.push('/users');
    }

    return (
        <section>
            {posts}
        </section>
    )

}

