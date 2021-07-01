import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [],
})
export class UserModule {}
