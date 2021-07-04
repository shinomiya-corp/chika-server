import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './lib/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req: Request, @Res() res: Response) {
    console.table(req.user);
    this.authService.login(req.user);
    res.redirect('http://localhost:3000');
  }
}
