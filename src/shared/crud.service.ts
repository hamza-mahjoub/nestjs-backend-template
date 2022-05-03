import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CrudService<T> {
  crudModel: Model<T>;
  constructor(model: Model<T>) {
    this.crudModel = model;
  }

  async create(newObj) {
    const obj = await this.crudModel.create(newObj);
    if (!obj) {
      throw new HttpException(
        'Something went wrong !',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return obj;
  }

  async get(id: string) {
    return await this.crudModel.findById(id);
  }

  async findOne(field, value) {
    return await this.crudModel.findOne({ field: value });
  }

  async getAll() {
    return await this.crudModel.find();
  }

  async deleteById(id) {
    return await this.crudModel.deleteOne({ _id: id });
  }

  async updateById(id, newObj) {
    return this.crudModel.findByIdAndUpdate(id, { ...newObj }, { new: true });
  }
}
