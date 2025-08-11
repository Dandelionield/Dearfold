import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { User } from '@user/entity/user.entity';
import { Issued } from '@models/issued.model';

@Injectable({
	
	providedIn: 'root'

}) export class AuthGuard implements CanActivate{

	public constructor(

		private authService: AuthService, private tokenService: TokenService, private router: Router

	) {}

	public async canActivate(): Promise<boolean> {

		const access: string | null = this.tokenService.getAccess();

		let user: User & Issued | undefined = this.authService.getUser();

		if (!user && !access) return false;

		if (!user && access){

			return this.tokenService.renew();

		}

		return user ? new Date()<=new Date(user.exp * 1000) : false;

	}

}