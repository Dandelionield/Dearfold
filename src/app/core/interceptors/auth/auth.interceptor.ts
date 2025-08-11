import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '@token/token.service';
import { SessionService } from '@session/session.service';
import { Token } from '@models/token.model';
import { AuthService } from '@auth/auth.service';

@Injectable() export class AuthInterceptor implements HttpInterceptor{

	public constructor(

		private tokenService: TokenService, private sessionService: SessionService, private authService: AuthService

	) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

		let access: string | null = this.tokenService.getAccess();
		const uuid: string | null = this.sessionService.getUUID();

		console.log(uuid);

		let buildHeaders = (access_token: string | null, uuid_param: string | null): { [key: string]: string } => {

			const headers: { [key: string]: string } = access_token ? {

				Authorization: `Bearer ${access_token}`

			} : {};

			if (uuid_param) headers['uuid'] = uuid_param;

			return headers;

		};

		if (access && request.url!=='http://localhost:3000/auth/refresh') {

			const cloned = request.clone({

				setHeaders: buildHeaders(access, uuid)

			});

			return next.handle(cloned).pipe(

				catchError((e: HttpErrorResponse) => {

					const refresh: string | null = this.tokenService.getRefresh();

					if (e.status !== 401 && !refresh) {

						return throwError(() => e);

					}

					return from(this.tokenService.renew()).pipe(

						switchMap((success: boolean) => {

							if (!success) {

								return throwError(() => e);

							}

							access = this.tokenService.getAccess();

							if (!access) {

								return throwError(() => e);

							}

							const retryReq = request.clone({

								setHeaders: buildHeaders(access, uuid)

							});

							return next.handle(retryReq);

						}), catchError(() => throwError(() => e))

					);

				})

			);

		}

		const cloned = request.clone({

			setHeaders: buildHeaders(null, uuid)

		});

		return next.handle(cloned);

	}

}