import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message: 'El nombre no puede ir vacio'})
    name: string
}
