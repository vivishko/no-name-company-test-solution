import { Test, TestingModule } from '@nestjs/testing';
import { SaveBlocksService } from './save-blocks.service';

describe('SaveBlocksService', () => {
  let service: SaveBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveBlocksService],
    }).compile();

    service = module.get<SaveBlocksService>(SaveBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
