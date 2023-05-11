import { IRootState, IMouseEnterAction, IMouseLeaveAction, IUser, IMouseClickAction } from '../interface'

type UserAction = IMouseEnterAction | IMouseLeaveAction | IMouseClickAction | { type: 'addData', payload: IUser[] } | { type: 'deleteData', payload: number }

const initialState: IRootState = {
    userDetails: [],
    userProfile: [],
}

export const UserdetailsReducer = (state: IRootState = initialState, action: UserAction) => {
    switch (action.type) {
        case 'mouseClick':
            return {
                ...state,
                userProfile: [
                    {
                        user: action.payload.user
                    }
                ]
            };
        case 'mouseLeave':
            return {
                ...state,
                userProfile: []
            }
        case 'addData':

            return {
                userDetails: action.payload,
                userProfile: []
            }

        case 'deleteData':
            const updatedList = [...state.userDetails];
            updatedList.splice(action.payload, 1);

            return {
                ...state,
                userDetails: updatedList
            };

        default:
            return state;
    }
}

