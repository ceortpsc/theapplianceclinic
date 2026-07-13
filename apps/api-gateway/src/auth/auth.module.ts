import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtGuard } from './ws-jwt.guard';
import { RolesGuard } from './roles.guard';
import { PrismaService } from 'packages/database/src/prisma.service';
import { JWT_EXPIRY } from '@clinic/common';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRY },
    }),
  ],
  providers: [AuthService, JwtStrategy, WsJwtGuard, RolesGuard, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, WsJwtGuard, RolesGuard],
})
export class AuthModule {}
