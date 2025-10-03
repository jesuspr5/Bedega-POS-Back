import { Test, TestingModule } from '@nestjs/testing';
import { BcvService } from './bcv.service';

describe('BcvService', () => {
  let service: BcvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcvService],
    }).compile();

    service = module.get<BcvService>(BcvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
