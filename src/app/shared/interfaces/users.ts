export interface IUserRequest {
    name:string,
    email:string,
    password:string,
    role:string
}
export interface IUserResponse extends IUserRequest {
    id:number|string;
}
export interface IUserPersonal {
    uid: string,
    email: string,
    role: string,
    firstName: string,
    lastName: string,
    phone: string
}