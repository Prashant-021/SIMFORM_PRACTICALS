export interface IUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    clicksReviewed: string,
    monthlyClicks: string,
    isUserActive: boolean
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