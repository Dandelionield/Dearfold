import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{

		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

	}, {

		path: '',
		redirectTo: 'home',
		pathMatch: 'full'

	}, {

		path: 'login',
		loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)

	},
  {
    path: 'logup',
    loadChildren: () => import('./pages/auth/logup/logup.module').then( m => m.LogupPageModule)
  },

];

@NgModule({

	imports: [

		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

	], exports: [RouterModule]

}) export class AppRoutingModule {}