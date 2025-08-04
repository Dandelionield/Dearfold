import { NgModule, Optional, SkipSelf } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '@core/interceptors/auth/auth.interceptor';

import { UserService } from './services/dearfold/user/user.service';
import { AuthService } from './services/dearfold/auth/auth.service';

@NgModule({

	declarations: [

		

	], imports: [

		

	], exports: [

		

	], providers: [

		provideHttpClient(withInterceptorsFromDi()), AuthService, UserService, {

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