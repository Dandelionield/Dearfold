import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { environment } from '@environment/environment';
import * as CryptoJS from 'crypto-js';
import { User } from '@user/entity/user.entity';
import { Issued } from '@models/issued.model';
import { Token } from '@models/token.model';

@Injectable({

	providedIn: 'root'

}) export class TokenService {

	public constructor(private authService: AuthService, private cookieService: CookieService) {}

	public async init(): Promise<boolean> {

		try{

			const access: string | null = this.getAccess();

			if (access && !this.authService.getUser()) {

				const userResponse: HttpResponse<User & Issued> = await this.authService.status();

				const user = userResponse.body;

				if (user) this.authService.setUser(user);

				return true;

			}

			return false;

		}catch(e){

			//this.removeAccess();

			return false;

		}

	}

	public async renew(): Promise<boolean> {

		const refresh: string | null = this.getRefresh();

		if (refresh){

			const tokenResponse: HttpResponse<Token> = await this.authService.refresh(refresh);

			const token: Token | null = tokenResponse.body;

			if (token){

				this.setToken(token);

				return await this.init();

			}

			return false;

		}

		return false;

	}

	public setToken(token: Token): void {

		this.setAccess(token.access_token);
		this.setRefresh(token.refresh_token);

	}

	public setAccess(access_token: string): void {

		localStorage.setItem('access_token', access_token);

	}

	public setRefresh(refresh_token: string): void {

		const encryptedToken = CryptoJS.AES.encrypt(

			refresh_token, 
			environment.encryptionKey

		).toString();

		this.cookieService.setCookie('refresh_token', encryptedToken, 60);

	}

	public getAccess(): string | null {

		return localStorage.getItem('access_token');

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