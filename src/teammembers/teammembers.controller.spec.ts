import { Test, TestingModule } from '@nestjs/testing';
import { TeammembersController } from './teammembers.controller';
import { TeammembersService } from './teammembers.service';

describe('TeammembersController', () => {
  let controller: TeammembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeammembersController],
      providers: [TeammembersService],
    }).compile();

    controller = module.get<TeammembersController>(TeammembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
