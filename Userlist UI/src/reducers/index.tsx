import { IRootState, IMouseEnterAction, IMouseLeaveAction, IMouseClickAction, IUser } from '../interface'

type UserAction = IMouseEnterAction | IMouseLeaveAction | IMouseClickAction | { type: 'addData', payload: IUser[] } | { type: 'deleteData', payload: number }

const initialState: IRootState = {
    userDetails: [
        {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "firstName": "Chetan",
            "lastName": "Bluth",
            "avatar": "https://reqres.in/img/faces/1-image.jpg",
            "clicksReviewed": "3000",
            "monthlyClicks": "5000",
            "isUserActive": true
        },
        {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "firstName": "Janet",
            "lastName": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg",
            "clicksReviewed": "1000",
            "monthlyClicks": "3000",
            "isUserActive": false
        },
        {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "firstName": "Emma",
            "lastName": "Wong",
            "avatar": "https://reqres.in/img/faces/3-image.jpg",
            "clicksReviewed": "3000",
            "monthlyClicks": "6000",
            "isUserActive": false
        },
        {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "firstName": "Eve",
            "lastName": "Holt",
            "avatar": "https://reqres.in/img/faces/4-image.jpg",
            "clicksReviewed": "2000",
            "monthlyClicks": "5000",
            "isUserActive": false
        },
        {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "firstName": "Charles",
            "lastName": "Morris",
            "avatar": "https://reqres.in/img/faces/5-image.jpg",
            "clicksReviewed": "1500",
            "monthlyClicks": "3000",
            "isUserActive": true
        },
        {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "firstName": "Tracey",
            "lastName": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg",
            "clicksReviewed": "5000",
            "monthlyClicks": "5000",
            "isUserActive": false
        }
    ],
    userProfile: []
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
        default:
            return state;
    }
}

