export interface IActionRequest {
    name:string,
    description:string,
    filePath:string
}
export interface IActionResponse extends IActionRequest {
    id:number
}