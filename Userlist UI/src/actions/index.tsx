import { IUser } from "../interface"

export const mouseEnter = (user: IUser) => {
  return {
    type: 'mouseEnter',
    payload: {
      user,
    }
  }
}
export const mouseLeave = (user: IUser) => {
  return {
    type: 'mouseLeave',
    payload: {
      user,
    }
  }
}
