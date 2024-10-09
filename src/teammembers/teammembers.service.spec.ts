import { Test, TestingModule } from '@nestjs/testing';
import { TeammembersService } from './teammembers.service';

describe('TeammembersService', () => {
  let service: TeammembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeammembersService],
    }).compile();

    service = module.get<TeammembersService>(TeammembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
