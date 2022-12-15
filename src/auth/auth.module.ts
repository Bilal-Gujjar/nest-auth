import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';


@Module({
    imports: [PassportModule,UserModule,JwtModule.register({
        secret : 'secret',
        signOptions: { expiresIn: '120s' },
    })
    ],
    controllers: [],
    providers: [LocalStrategy,JWTStrategy, AuthService ],
    exports: [AuthService]
})
export class AuthModule {}
