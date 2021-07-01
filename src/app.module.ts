import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';

@Module({
  imports: [TypeOrmConfigModule],
  providers: [],
})
export class AppModule {}
