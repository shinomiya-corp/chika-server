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
    return res
      .cookie('access_token', access_token, {
        maxAge: 3600000 * 24,
        httpOnly: true,
      })
      .redirect(process.env.WEB_CLIENT_URL);
  }
}
