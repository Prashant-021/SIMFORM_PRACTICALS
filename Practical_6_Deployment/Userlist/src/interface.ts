export interface IUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    clicksReviewed: string,
    monthlyClicks: string,
    UserStatus: string
}

export interface IRootState{
    userDetails: IUser[]
    userProfile: {
        user: IUser
    }[];
}

export interface IMouseEnterAction{
    type: 'mouseEnter';
    payload: {
        user: IUser;
    }
}

export interface IMouseLeaveAction{
    type: 'mouseLeave';
}

export interface IMouseClickAction{
    type: 'mouseClick';
    payload: {
        user: IUser;
    }
}
