import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UsersModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
