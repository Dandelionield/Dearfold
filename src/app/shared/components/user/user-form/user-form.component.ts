import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { User } from '@user/entity/user.entity';
import { Credential } from '@models/credential.model';
import { SwalService } from '@shared/services/swal/swal.service';

@Component({

	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
	standalone: false

}) export class UserFormComponent implements OnInit {

	@Input() public user: User & Credential | null = null;

	@Output() public formSubmit = new EventEmitter<Partial<{ 

		name: string; 
		email: string; 
		password: string | null 

	}>>();
	
	public userForm = this.fb.nonNullable.group({

		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', this.user ? [] : [Validators.required]]

	});

	public selectedImage: string | undefined = undefined;
	public isTakingPicture: boolean = false;

	public constructor(

		private fb: FormBuilder, private swalService: SwalService

	) {}

	public ngOnInit(): void {

		if (this.user) {

			this.userForm.patchValue({

				name: this.user.name,
				email: this.user.email,
				password: ''

			});
			
			this.selectedImage = this.user.picture;

			this.userForm.get('password')?.clearValidators();
			this.userForm.get('password')?.updateValueAndValidity();

		}

	}

	public async takePicture(): Promise<void> {

		this.isTakingPicture = true;
		
		try {

			const image = await Camera.getPhoto({

				quality: 90,
				allowEditing: true,
				resultType: CameraResultType.DataUrl,

			});

			this.selectedImage = image.dataUrl;

		} catch (e: any) {

			this.swalService.showException('Error', e.message);

		} finally {

			this.isTakingPicture = false;

		}

	}

	public removePicture(): void {

		this.selectedImage = undefined;

	}

	public onSubmit(): void {

		if (this.userForm.valid){

			this.formSubmit.emit(this.userForm.value);

		}else{

			this.userForm.markAllAsTouched();

		}

	}

}