import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit {

	public constructor(private authService: AuthService) {}

	public async ngOnInit(): Promise<void> {

		try {

			console.log(await this.authService.status());

		}catch(e: any){

			console.log(e, e?.error?.message);

		}

	}

}