import { NgModule, Optional, SkipSelf } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

import { UserService } from './services/dearfold/user/user.service';
import { AuthService } from './services/dearfold/auth/auth.service';

import { TokenService } from './services/storage/token/token.service';
import { CookieService } from './services/storage/cookie/cookie.service';

@NgModule({

	declarations: [

		

	], imports: [

		

	], exports: [

		

	], providers: [

		provideHttpClient(withInterceptorsFromDi()), AuthService, UserService, TokenService, CookieService, {

			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true

		}

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule already rendered. Import it only at AppModule');

		}

	}

}