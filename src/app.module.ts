import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { ProfileModule } from './profile/profile.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/exception/exception.filter';

@Module({
  imports: [TypeOrmConfigModule, ProfileModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
