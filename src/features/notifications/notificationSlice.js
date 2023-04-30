import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";


const notificationsAdapter = createEntityAdapter({
    sortComparer : (a,b) => b.date.localeCompare(a.date)
})


export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',
    async (_, {getState}) => {
        // here _ means 'notifictations/fetchNotifications' since the first and only
        // argument of create thunk will be always the first argument for payload creator callback
        // the second argument of the creator is called the thunk api and contains usefull functions like getState, dispatch etc..
        const allNotifications = selectAllNotifications(getState());
        const [latestNotificaton] = allNotifications;
        const LatestTimestamp = latestNotificaton ? latestNotificaton.date : '';
        const response = await client.get('/fakeApi/notifications?since=' + LatestTimestamp);
        return response.data;
    }
    
)

const notificationsSlice = createSlice({
    name : 'notificatons',
    initialState : notificationsAdapter.getInitialState(),
    reducers : {
        makeAllRead(state, action) {
           Object.values(state.entities).forEach(notification => {
                notification.read = true;
           });
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchNotifications.fulfilled, (state, action) => {
            notificationsAdapter.upsertMany(state, action.payload);
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read;
            })
        })
    }
});

export const {makeAllRead} = notificationsSlice.actions;
export default notificationsSlice.reducer;
export const {selectAll : selectAllNotifications} = notificationsAdapter.getSelectors(state => state.notifications);