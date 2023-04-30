import { createAsyncThunk, createSlice , createEntityAdapter} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('fakeApi/users');
    //console.log(response.data);
    return response.data;
});



const UsersSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, /*usersAdapter.setAll or : */ (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
        })
    }
})

export default UsersSlice.reducer;

export const {
    selectAll : selectAllUsers,
    selectById : selectUserById
} = usersAdapter.getSelectors(state => state.users);