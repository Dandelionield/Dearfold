import { Component, OnInit } from '@angular/core';
import { TokenService } from '@token/token.service';
import { SessionService } from '@session/session.service';

@Component({

	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,

}) export class AppComponent implements OnInit {

	public constructor(

		private tokenService: TokenService, private sessionService: SessionService

	) {}

	public async ngOnInit(): Promise<void> {

		await this.sessionService.init();

		if (!await this.tokenService.init()) {

			await this.tokenService.renew();

		}

	}

}