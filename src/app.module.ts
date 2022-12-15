import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath : '.local.env'
        // envFilePath : '.build.env'
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get<number>('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        synchronize: configService.get<boolean>('SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        
      }),
      inject: [ConfigService],
    }),
    UserModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
