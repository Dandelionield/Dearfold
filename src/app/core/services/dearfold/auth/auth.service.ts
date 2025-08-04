import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
import { User } from '@user/entity/user.entity';
import { Credential } from '@models/credential.model';
import { Token } from '@models/token.model';
import { Issued } from '@models/issued.model';
import { Attribute } from '@repo-types/attribute.type';
import { environment } from '@environment/environment';

@Injectable({

  providedIn: 'root'

}) export class AuthService {

	private readonly collectionName = `${environment.dearfold.BaseUrl}/${environment.dearfold.collection.auth.name}`;

	private _loggedUser: BehaviorSubject<User & Issued | undefined> = new BehaviorSubject<User & Issued | undefined>(undefined);
	public loggedUser$: Observable<User & Issued | undefined> = this._loggedUser.asObservable();

	public constructor(private readonly http: HttpClient) {}

	public async logup(account: Credential & Partial<User>): Promise<HttpResponse<Attribute<User>>> {

		try{

			return await lastValueFrom(this.http.post(`${this.collectionName}/logup`, account, {

				observe: 'response'

			})) as HttpResponse<Attribute<User>>;

		}catch(e: any){

			throw e as HttpErrorResponse;

		}

	}

	public async login(cred: Credential): Promise<HttpResponse<Token>> {

		try{

			return await lastValueFrom(this.http.post(`${this.collectionName}/login`, cred, {

				observe: 'response'

			})) as HttpResponse<Token>;

		}catch(e: any){

			throw e as HttpErrorResponse;

		}

	}

	public async logout(refresh_token: string): Promise<HttpResponse<void>> {

		try{

			return await lastValueFrom(this.http.delete(`${this.collectionName}/logout`, {

				body: {refresh_token},
				observe: 'response'

			})) as HttpResponse<void>;

		}catch(e: any){

			throw e as HttpErrorResponse;

		}

	}

	public async status(): Promise<HttpResponse<User & Issued>> {

		try{

			return await lastValueFrom(this.http.get(`${this.collectionName}/status`, {

				observe: 'response'

			})) as HttpResponse<User & Issued>;

		}catch(e: any){

			throw e as HttpErrorResponse;

		}

	}

	public setUser(user: User & Issued | undefined): void {

		this._loggedUser.next(user);

	}

	public getUser(): User & Issued {

		return this._loggedUser.value as User & Issued;

	}

}