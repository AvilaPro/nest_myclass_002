export class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly imageURL: string;
    readonly createdAt: Date;
}
