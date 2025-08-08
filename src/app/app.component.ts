import { Component, OnInit } from '@angular/core';
import { TokenService } from '@token/token.service';

@Component({

	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,

}) export class AppComponent implements OnInit {

	public constructor(private tokenService: TokenService) {}

	public async ngOnInit(): Promise<void> {

		await this.tokenService.init();

	}

}