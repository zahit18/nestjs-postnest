import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre no puede ir vacio' })
    @IsString({ message: 'Valor no valido' })
    name: string

    @IsNotEmpty({ message: 'El Precio del Producto es Obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no valido' })
    price: number

    @IsNotEmpty({ message: 'La cantidad no puede ir vacia' })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no valido' })
    inventory: number

    @IsNotEmpty({ message: 'La categoria es obligatoria' })
    @IsInt({message: 'La categoria no es valida'})
    categoryId: number
}
