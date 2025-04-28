import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  refreshTokens(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.headers.authorization?.split(' ')[1];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('logout')
  async logout(@Req() req: any) {
    const userId = req.user.sub;
    await this.authService.logout(userId);
    return { message: 'Logged out' };
  }
}
