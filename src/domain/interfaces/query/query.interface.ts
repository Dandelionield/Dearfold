import { Entity } from '@models/entity.model';
import { Observable } from 'rxjs';

export interface IQuery<T extends Entity<unknown>> {

	findOne(id: T['id']): Observable<T | undefined> | Promise<T | undefined> | T | undefined;

	findAll(): Observable<Array<T>> | Promise<Array<T>> | Array<T>;

}