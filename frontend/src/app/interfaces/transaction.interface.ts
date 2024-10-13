export interface ITransaction {
    id?: number,
    type: string,
    value: number,
    date: Date,
    description: string
}