import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from 'packages/database/src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set via global JWT strategy

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access Denied: Insufficient Role Permissions');
    }

    // HIPAA/SOC2 compliance: Dynamic logging of read/write attempts to protected modules
    const controllerName = context.getClass().name.replace(/Controller$/, '').toUpperCase();
    const handlerName = context.getHandler().name.toUpperCase();
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: `${controllerName}_${handlerName}`,
        resource: context.getClass().name,
        ipAddress: request.ip || '0.0.0.0',
        userAgent: request.headers['user-agent'] || 'unknown',
      },
    });

    return true;
  }
}
