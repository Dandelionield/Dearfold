import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { environment } from '@environment/environment';
import * as CryptoJS from 'crypto-js';
import { User } from '@user/entity/user.entity';
import { Issued } from '@models/issued.model';

@Injectable({

	providedIn: 'root'

}) export class TokenService {

	public constructor(private authService: AuthService, private cookieService: CookieService) {}

	public async init(): Promise<void> {

		try{

			const token: string | null = localStorage.getItem('access_token');

			if (token && !this.authService.getUser()) {

				const userResponse: HttpResponse<User & Issued> = await this.authService.status();

				const user = userResponse.body;

				if (user) this.authService.setUser(user);

			}

		}catch(e){console.log(e);}

	}

	public getAccess(): string | null {

		return localStorage.getItem('access_token');

	}

	public setAccess(access_token: string): void {

		localStorage.setItem('access_token', access_token);

	}

	public setRefresh(refresh_token: string): void {

		const encryptedToken = CryptoJS.AES.encrypt(

			refresh_token, 
			environment.encryptionKey

		).toString();

		this.cookieService.setCookie('refresh_token', refresh_token, 60);

	}

	public getRefresh(): string | null {

		const encryptedToken = this.cookieService.getCookie('refresh_token');

		if (!encryptedToken) return null;

		const bytes = CryptoJS.AES.decrypt(

			encryptedToken, 
			environment.encryptionKey

		);

		return bytes.toString(CryptoJS.enc.Utf8);

	}

	public removeAccess(): void {

		localStorage.removeItem('access_token');

	}

}