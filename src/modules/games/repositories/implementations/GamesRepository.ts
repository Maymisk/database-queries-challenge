import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const array = await this.repository.createQueryBuilder('game').where("game.title ILIKE :gameTitle", { gameTitle: `%${param}%`}).getMany()
    return array
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT("id") FROM "games"`);  // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games = await this.repository.createQueryBuilder('game').leftJoinAndSelect('game.users', 'user').where("game.id = :gameId", {gameId: id}).getMany()

    return games[0].users
      // Complete usando query builder
  }
}
