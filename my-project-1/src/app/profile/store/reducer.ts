import { createReducer, on } from "@ngrx/store";
import { initialState, initialUsers, token } from "./store";
import { loadItemSuccess, loadItemFailure, loadUserFailure,loadUserSuccess} from "./actions";

export const blogReducers = createReducer(initialState,
    on(loadItemSuccess, (state, { users }) => ({ ...state, users })),
    on(loadItemFailure, (state, { error }) => ({ ...state, error }))
)

export const userReducers = createReducer(initialUsers,
    on(loadUserSuccess, (state, { usersdata }) => ({ ...state, usersdata })),
    on(loadUserFailure, (state, { error }) => ({ ...state, error }))
)
