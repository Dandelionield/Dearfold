import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { User } from '@user/entity/user.entity';
import { Issued } from '@models/issued.model';

@Component({

	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false

}) export class HeaderComponent implements OnInit, OnDestroy {

	@Input() public title: string = 'Page';
	@Input() public showBackButton: boolean = false;
	public isExpanded: boolean = false;

	public loggedUser$: Observable<User & Issued | undefined> = this.authService.loggedUser$;
	public user: User & Issued | undefined;

	public constructor(

		private router: Router,
		private location: Location,
		private authService: AuthService,
		private tokenService: TokenService

	) {}

	public toggleHeader(): void {

		this.isExpanded = !this.isExpanded;

	}

	public ngOnInit(): void {

		this.loggedUser$.subscribe({

			next: (t) => {

				this.user = t;

			}, error: (e) => {console.log(e);}

		});

	}

	public ngOnDestroy(): void {}

	public async logout(): Promise<void> {

		this.tokenService.removeAccess();
		this.router.navigate(['/login']);

	}

	public async login(): Promise<void> {

		this.router.navigate(['/login']);

	}

	public goBack(): void{

		this.location.back();

	}

}