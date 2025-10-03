import { Test, TestingModule } from '@nestjs/testing';
import { BcvController } from './bcv.controller';
import { BcvService } from './bcv.service';

describe('BcvController', () => {
  let controller: BcvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcvController],
      providers: [BcvService],
    }).compile();

    controller = module.get<BcvController>(BcvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
