import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { SideBarMenuComponent } from './components/side-bar/side-bar-menu/side-bar-menu.component';

import { LoadingService } from './services/loading/loading.service';
import { SwalService } from './services/swal/swal.service';

@NgModule({

	declarations: [

		HeaderComponent,
		LoadingComponent,
		UserFormComponent,
		SideBarMenuComponent

	], imports: [

		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
		RouterModule

	], exports: [

		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule,
		HeaderComponent,
		LoadingComponent,
		UserFormComponent,
		SideBarMenuComponent

	], providers: [

		LoadingService,
		SwalService

	]

}) export class SharedModule {}