export interface IUserRequest {
    name:string,
    email:string,
    password:string,
    role:string
}
export interface IUserResponse extends IUserRequest {
    id:number|string;
}