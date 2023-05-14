import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, User } from '../../../interface'

interface UserState {
    userList: User[];
}

const initialState: UserState = {
    userList: JSON.parse(localStorage.getItem("userList") || '[]'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            const storedUser: User[] = JSON.parse(localStorage.getItem("userList") || '[]');
            const isUserExisting = state.userList.find(user => (user.name === action.payload.name || user.email === action.payload.email))
            if (!isUserExisting) {
                state.userList.push(action.payload);
                const updatedUser = [...storedUser, action.payload]
                localStorage.setItem("userList", JSON.stringify(updatedUser))
                alert(`Welcome ${action.payload.name}`)
            }
            else
                alert("User already exist")
        },
    },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
export const getUser = (state: RootState) => state.user.userList;