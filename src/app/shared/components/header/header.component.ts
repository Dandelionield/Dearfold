import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({

	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false

}) export class HeaderComponent implements OnInit, OnDestroy {

	@Input() public title: string = 'Page';
	@Input() public showBackButton: boolean = false;

	//public loggedUser$ = this.authService.loggedUser$;

	public constructor(

		private router: Router,
		private location: Location

	) {}

	public ngOnInit(): void {

		/*this.loggedUser$.subscribe({

			next: (t) => {

				this.user = t;

			}, error: (e) => {console.log(e);}

		});*/

	}

	public ngOnDestroy(): void {}

	public async logout(): Promise<void> {

		//await this.authService.logout();
		this.router.navigate(['/']);

	}

	public goBack(): void{

		this.location.back();

	}

}