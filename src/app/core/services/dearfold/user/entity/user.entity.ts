import { Entity } from '@models/entity.model'; 

export interface User extends Entity {

	name: string,
	picture: string,
	admin: boolean

}