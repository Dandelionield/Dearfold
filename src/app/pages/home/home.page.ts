import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { User } from '@user/entity/user.entity';
import { Issued } from '@models/issued.model';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit {

	public user: User & Issued | undefined;

	public constructor(private authService: AuthService, private tokenService: TokenService) {}

	public async ngOnInit(): Promise<void> {

		//console.log('Token: '+this.tokenService.getRefresh());

		/*try {

			console.log(await this.authService.status());

		}catch(e: any){

			console.log(e, e?.error?.message);

		}/**/

	}

}