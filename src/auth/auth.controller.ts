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
    const { access_token } = this.authService.login(req.user);
    console.log({ access_token });
    return res
      .cookie('access_token', `Bearer ${access_token}`, {
        maxAge: 60000,
        httpOnly: true,
      })
      .redirect('http://localhost:3000');
  }
}
