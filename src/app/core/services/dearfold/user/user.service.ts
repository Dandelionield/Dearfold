import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { IQuery } from '@interfaces/query/query.interface';
import { User } from './entity/user.entity';

@Injectable({

	providedIn: 'root'

}) export class UserService {

	public constructor(private http: HttpClient) {}

}