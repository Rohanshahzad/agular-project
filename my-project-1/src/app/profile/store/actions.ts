import {createAction, props} from '@ngrx/store'
import { arrayCards } from 'src/app/interfaces/interface'

export const  loadItem = createAction('[Blogs] Load Items')
export const  loadItemSuccess = createAction('[Blogs] Load Items Success',props<{ users: arrayCards[] }>())
export const  loadItemFailure = createAction('[Blogs] Load Items Failure',props<{ error: string }>())


export const  loadUser = createAction('[Users] Load Users')
export const  loadUserSuccess = createAction('[Users] Load Users Success',props<{ usersdata: any }>())
export const  loadUserFailure = createAction('[Users] Load Users Failure',props<{ error: string }>())

export const setToken = createAction('[Token] Create Token')
export const getToken = createAction('[Token] Get Token')
export const deleteToken = createAction('[Token] Delete Token')

