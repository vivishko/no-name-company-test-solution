import { Controller, Get } from '@nestjs/common';

@Controller('address')
export class AddressController {
  @Get()
  getMostChanged(): string {
    return 'This action returns all cats';
  }
}
