import { Controller, Get } from '@nestjs/common';

import { GetUserId } from 'src/common/decorators';
import { CreateGameDto } from './dto/create-game.dto';
import { GameManagerService } from './services/gameManager.service';
import { Game } from './classes/Game';
import { GameRequest } from '../../../shared/common/types/game.type';
import { GameDbService } from './services/gameDb.service';

@Controller('game')
export class GameController {
  constructor(
    private gameManager: GameManagerService,
    private gameDb: GameDbService,
  ) {}

  // @Post()
  // async createGame(@GetUserId() userId: number, @Body() dto: CreateGameDto) {
  //   console.log('creating game without ID');
  //   return this.gameService.createGame(userId, dto.toId);
  // }

  @Get('myGameRequests')
  getMyGameRequest(@GetUserId() userId: number): GameRequest[] {
    return this.gameManager.getGameRequestById(userId);
  }

  @Get('myGames')
  getMyGames(@GetUserId() userId: number) {
    return this.gameDb.getMyGames(userId);
  }

  // @Post(':id')
  // createGameById(
  //   @GetUserId() userId: number,
  //   @Param('id', ParseIntPipe) toId: number,
  // ) {
  //   return this.gameService.createGame(userId, toId);
  // }
}
