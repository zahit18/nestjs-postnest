import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepository : Repository<Category>
  ){}
  create(createCategoryDto: CreateCategoryDto) {
    // const category = new Category()
    // category.name = createCategoryDto.name
    // return this.categoryRepository.save(category)
    return this.categoryRepository.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepository.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({id})
    if (!category) throw new NotFoundException('La Categoria no existe')
    return category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
