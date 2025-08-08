import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { Credential } from '@models/credential.model';
import { SwalService, ErrorMessage } from '@shared/services/swal/swal.service';
import { LoadingService } from '@shared/services/loading/loading.service';
import { User } from '@user/entity/user.entity';
import { Attribute } from '@repo-types/attribute.type';

@Component({

	selector: 'app-logup',
	templateUrl: './logup.page.html',
	styleUrls: ['./logup.page.scss'],
	standalone: false

}) export class LogupPage implements OnInit {

	logupForm = this.fb.nonNullable.group({

		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]

	});

	public constructor(

		private fb: FormBuilder,
		private authService: AuthService,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private router: Router

	) {}

	public ngOnInit(): void {}

	public async onSubmit(): Promise<void> {

		this.loadingService.show('Logging');

		try{

			if (this.logupForm.invalid) {

				this.logupForm.markAllAsTouched();
				throw new Error('Invalid Paramethers');

			}

			const name = this.logupForm.get('name')?.value;
			const email = this.logupForm.get('email')?.value;
			const password = this.logupForm.get('password')?.value;

			if (!email || !password || !name) {

				throw new Error('Invalid Paramethers');

			}

			const cred: Credential = {

				email: email,
				password: password

			};

			const user: Credential & Partial<User> = {

				name: name.trim(),
				picture: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 131812794)}?v=4`,//'https://ionicframework.com/docs/img/demos/avatar.svg'
				...cred

			}

			let ResponseId: HttpResponse<Attribute<User>> = await this.authService.logup(user);

			const attribute: Attribute<User> | null = ResponseId.body;

			if (attribute){

				await this.swalService.showInformation('Logged Up', 'Account succesfully created.');
				this.router.navigate(['/login']);

			}else{

				this.swalService.showException(`Error ${ResponseId.status}`, 'Unable to access');

			}

		}catch (e: any){

			//console.log(e);

			this.swalService.showException(`Error ${e.status}`, ErrorMessage(e));

		}finally{

			this.loadingService.hide();

		}

	}

}