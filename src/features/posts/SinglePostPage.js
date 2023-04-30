import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "../users/PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./PostsSlice";

export const SinglePostPage = ({match}) => {
    // match.params returns an object with key names of all the route params with the names we chose
    const {postId} = match.params;
    //the exact key name must be destuctured from objects (we named the key postId in the route parameter)
    const post = useSelector(state => selectPostById(state, postId));
    // ^ only useSelector has access to the state so we need to take it as a parameter to allow the innner function to read it. unless the inner function doesn't have a second parameter.


    return post ? ( 
        <section>
            <article>
                <h2>{post.title}</h2>
                <p>{post.content.substring(0,100)}</p>
                <br />
                <PostAuthor userId={post.user} />
                <br />
                <TimeAgo timestamp={post.date}/>
                <br />
                    <ReactionButtons post={post}/>
                <br />
                <br />
                <Link to={`/editPost/${post.id}`}><button>Edit Post</button></Link>
                
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

