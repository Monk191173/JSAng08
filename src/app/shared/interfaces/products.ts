export interface IProductRequest {
    name:string,
    category:string,
    subcategory:string,
    description:string,
    weight:string,
    price:number,
    filePath:string
}
export interface IProductResponse extends IProductRequest {
    id:number|string;
}