// backend\src\pins\pins.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard'; // Adjust this import according to your structure
import { PinsService } from './pins.service';
import { UploadFileInterceptor } from 'src/utils/uploadFile.interceptor';
import { CreatePinDto } from './dto/create-pin.dto'; // Import your DTO if you have one

@Controller('pins')
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  @Post('new')
  @UseGuards(AuthGuard)
  @UseInterceptors(UploadFileInterceptor)
  async createPin(
    @Body() createPinDto: CreatePinDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request, // Using @Req() to get the request object
    @Res() res: Response,
  ) {
    const result = await this.pinsService.createPin(
      createPinDto,
      file,
      req.user, // Property 'user' does not exist on type 'Request'.ts(2339)
    );
    return res.json(result);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllPins(@Res() res: Response) {
    const pins = await this.pinsService.getAllPins();
    return res.json(pins);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSinglePin(@Param('id') id: string, @Res() res: Response) {
    const pin = await this.pinsService.getSinglePin(id);
    return res.json(pin);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePin(
    @Param('id') id: string,
    @Body() updatePinDto: CreatePinDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.pinsService.updatePin(id, updatePinDto, req.user);
    return res.json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePin(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.pinsService.deletePin(id, req.user);
    return res.json(result);
  }

  @Post('comment/:id')
  @UseGuards(AuthGuard)
  async commentOnPin(
    @Param('id') id: string,
    @Body('comment') comment: string,
    @Req() req: Request, // Get the user from the request
    @Res() res: Response,
  ) {
    const result = await this.pinsService.commentOnPin(id, comment, req.user); // Pass req.user to the service
    return res.json(result);
  }

  @Delete('comment/:id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('id') id: string,
    @Query('commentId') commentId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.pinsService.deleteComment(
      id,
      commentId,
      req.user,
    );
    return res.json(result);
  }

  @Put('like/:id')
  @UseGuards(AuthGuard)
  async likePin(
    @Param('id') pinId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.pinsService.likePin(
      pinId,
      req.user._id.toString(),
    );
    return res.json(result);
  }

  @Put('unlike/:id')
  @UseGuards(AuthGuard)
  async unlikePin(
    @Param('id') pinId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.pinsService.unlikePin(
      pinId,
      req.user._id.toString(),
    );
    return res.json(result);
  }
}
