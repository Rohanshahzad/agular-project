import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BlogsApiService } from "src/app/services/blogs-api.service";
import { loadItem, loadItemFailure, loadItemSuccess, loadUser, loadUserFailure, loadUserSuccess } from "../store/actions";
import { of } from "rxjs";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserDataService } from "src/app/services/user-data.service";


@Injectable()
export class EffectsComponent {
    constructor(private action$: Actions, private blogservice: BlogsApiService, private userService: UserDataService) {}
    loadBlogs$ = createEffect(() =>
      this.action$.pipe(
        ofType(loadItem),
        mergeMap(() =>
          this.blogservice.getBlogs().pipe(
            map(users => loadItemSuccess({ users })),
            catchError(error => of(loadItemFailure({ error: "error occurred" })))
          )
        )
      )
    );

    loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUser),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(usersdata => loadUserSuccess({ usersdata })),
          catchError(error => of(loadUserFailure({ error: "error occurred" })))
        )
      )
    )
  ); 
  }