import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@token/token.service';

@Injectable() export class AuthInterceptor implements HttpInterceptor{

	public constructor(private tokenService: TokenService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

		const token: string | null = this.tokenService.getAccess();

		if (token) {

			const cloned = request.clone({

				setHeaders: {

					Authorization: `Bearer ${token}`

				}

			});

			return next.handle(cloned);

		}

		return next.handle(request);

	}

}