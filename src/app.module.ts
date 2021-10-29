import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { ProfileModule } from './profile/profile.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/exception/exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/jwt/strategy/jwt.strategy';
import { SongModule } from './song/song.module';
import { CommentModule } from './comment/comment.module';
import { PlaylistModule } from './playlist/playlist.module';
import { WinstonModule } from 'nest-winston';
import { LoggerMiddleware } from './config/logger/logger.middleware';
import { ProfileController } from './profile/profile.controller';
import { SongController } from './song/song.controller';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    ProfileModule,
    JwtModule.register({}),
    SongModule,
    CommentModule,
    PlaylistModule,
    WinstonModule.forRoot({}),
    SearchModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
