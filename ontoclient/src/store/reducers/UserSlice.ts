import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";


interface UserState {
    user: IUser | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }
})


export default userSlice.reducer;
