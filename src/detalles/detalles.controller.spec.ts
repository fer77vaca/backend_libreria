import { Test, TestingModule } from '@nestjs/testing';
import { DetallesController } from './detalles.controller';
import { DetallesService } from './detalles.service';

describe('DetallesController', () => {
  let controller: DetallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesController],
      providers: [DetallesService],
    }).compile();

    controller = module.get<DetallesController>(DetallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
