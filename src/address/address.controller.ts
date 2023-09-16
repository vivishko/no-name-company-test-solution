import { Controller, Get } from '@nestjs/common';
import { getLastBlockNumber, getBlockInfo } from '../helpers/fetchFunctions';

@Controller('address')
export class AddressController {
  @Get()
  getMostChanged(): string {
    // запросить инфу о последних 100 блоках

    // вычленить из них n транзакций

    // выписать из каждой из них адреса кошельков - from и to - в мапу:
    // если кошелёк в from - минусовать число, если в to - плюсовать

    return 'This action returns all cats';
  }
}
