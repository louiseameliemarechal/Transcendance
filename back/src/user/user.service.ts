import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async editUser(userId: number, dto: EditUserDto): Promise<User> {
		const user = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				...dto,
			}
		});
		return user
	}
}
