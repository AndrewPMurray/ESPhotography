import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: number;
	declare username: string;
	declare email: string;
	declare hashedPassword: string;
	declare createdAt: Date;
	declare updatedAt: Date;
	declare deletedAt: Date;
}
