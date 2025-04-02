import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from '@shared/repositories/base.repository';
import { getCurrentDate } from '@common/utils/date.utils';
@Injectable()
export class UsersService extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async findAllUser(): Promise<User[]> {
    const user = await this.userModel.find({
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    });
console.log('user ', user)
    if (!user) {
      return null;
    }
    return user;
  }

  async create(entities: Partial<User>): Promise<User> {
    const user = await this.userModel.create(entities);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, updatedAt: getCurrentDate() },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    });
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
  }
}
