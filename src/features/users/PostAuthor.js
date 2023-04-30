import { useSelector } from "react-redux";
import{ selectUserById } from "./UsersSlice";

export const PostAuthor = ({userId}) => {
    const Author = useSelector(state => selectUserById(state, userId))

    return (
        <span>by {Author ? Author.name : 'unknown user'}</span>
    )

}