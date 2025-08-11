import { Injectable } from '@angular/core';
import { CookieService } from '@cookie/cookie.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({

	providedIn: 'root'

}) export class SessionService {

	public constructor(private cookieService: CookieService) {}

	public init(): void {

		const uuid: string | null = this.getUUID();

		if (!uuid){

			this.setUUID(uuidv4());

		}

	}

	public setUUID(uuid: string): void {

		this.cookieService.setCookie('uuid', uuid, 60);

	}

	public getUUID(): string | null {

		return this.cookieService.getCookie('uuid');

	}

}