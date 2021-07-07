import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { ProfileModule } from './profile/profile.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/exception/exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/jwt/passport/jwt.strategy';
import { SongModule } from './song/song.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    ProfileModule,
    JwtModule.register({}),
    SongModule,
    CommentModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
