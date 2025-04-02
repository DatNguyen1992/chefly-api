import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from '@shared/repositories/base.repository';
export declare class UsersService extends BaseRepository<User> {
    private userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User>;
    findAllUser(): Promise<User[]>;
    create(entities: Partial<User>): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findAll(): Promise<User[]>;
}
