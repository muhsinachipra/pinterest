// backend\src\users\users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AuthGuard } from '../guards/auth.guard'; // Import AuthGuard

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SEC, // Use your JWT secret from env variables
      signOptions: { expiresIn: '60s' }, // Adjust expiration as needed
    }),
  ],
  providers: [UsersService, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
