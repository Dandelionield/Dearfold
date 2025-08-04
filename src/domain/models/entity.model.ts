
export interface Entity<T = string> {

	id: T,
	state: boolean,
	createdAt: string | Date,
	updatedAt: string | Date

}