import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";


interface UserState {
    user: IUser | null
}

const initialState: UserState = {
    // user: null

    user: {
        id: 35,
        email: "yasha132456@gmail.com",
        username: "yasha132456@gmail.com"
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})


export default userSlice.reducer;
