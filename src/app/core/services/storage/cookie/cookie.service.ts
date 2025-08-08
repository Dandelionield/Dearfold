import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({

	providedIn: 'root'

}) export class CookieService {

	public constructor() {}

	public setCookie(name: string, value: string, days: number): void {

		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = `expires=${date.toUTCString()}`;
		const secureFlag = environment.production ? '; Secure' : '';
		document.cookie = `${name}=${value}; ${expires}; Path=/; SameSite=Strict${secureFlag}; HttpOnly`;

	}

	public getCookie(name: string): string | null {

		const nameEQ = `${name}=`;
		const ca = document.cookie.split(';');

		for (let i = 0; i < ca.length; i++) {

			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);

		}

		return null;

	}

	/*private deleteCookie(name: string): void {

		document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

	}/**/

}