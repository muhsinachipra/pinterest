// backend\src\users\users.controller.ts

import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard'; // Import your AuthGuard
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body() body: { name: string; email: string; password: string },
    @Res() res: Response,
  ) {
    const result = await this.userService.registerUser(body, res); // Expected 2 arguments, but got 1.ts(2554)
    return res.status(result.status).json(result);
  }

  @Post('login')
  async loginUser(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const result = await this.userService.loginUser(body, res);
    return res.status(result.status).json(result);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async myProfile(@Req() req: Request) {
    const result = await this.userService.myProfile(req.user._id.toString());
    return result;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async userProfile(@Param('id') id: string) {
    const result = await this.userService.userProfile(id);
    return result;
  }

  @Post('follow/:id')
  @UseGuards(AuthGuard)
  async followAndUnfollowUser(@Param('id') id: string, @Req() req: Request) {
    const result = await this.userService.followAndUnfollowUser(
      id,
      req.user._id.toString(),
    );
    return result;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logOut(@Res() res: Response) {
    const result = await this.userService.logOutUser(res);
    return res.json(result);
  }
}
