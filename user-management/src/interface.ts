export interface User { 
    profilepicture: FileList[0] | null,   
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
}

export interface currentUser {
    Email: string,
    password: string
}

export interface RootState {
    user: {
        userList: User[],
        currentUser: currentUser
    }
}