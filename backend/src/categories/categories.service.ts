import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: payload,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('The category already exists');
        }
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.category.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Category not found');
        }
      }
    }
  }

  async update(id: string, payload: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === 'P2025') {
          throw new NotFoundException('Category not found');
        }
        console.log(error);
      }
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === 'P2025') {
          throw new NotFoundException('Category not found');
        }
        console.log(error);
      }
    }
  }
}
