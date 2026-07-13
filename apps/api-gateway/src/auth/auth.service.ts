import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';
import { PrismaService } from 'packages/database/src/prisma.service';
import { JwtPayload, UserRole } from '@clinic/common';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(email: string, password: string, mfaToken?: string) {
    const user = await this.validateUser(email, password);

    if (user.isMfaEnabled) {
      if (!mfaToken || !user.mfaSecret) {
        throw new UnauthorizedException('MFA token required');
      }
      const isValidToken = authenticator.verify({
        token: mfaToken,
        secret: user.mfaSecret,
      });
      if (!isValidToken) {
        throw new UnauthorizedException('Invalid MFA token');
      }
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as unknown as UserRole,
      isMfaEnabled: user.isMfaEnabled,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async setupMfa(userId: string) {
    const secret = authenticator.generateSecret();
    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: secret, isMfaEnabled: true },
    });
    return { secret };
  }
}
