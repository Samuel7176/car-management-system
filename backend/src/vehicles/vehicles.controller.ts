import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { GetVehiclesQueryDto } from './dto/get-vehicles-query.dto.js';
import { UpdateVehicleDto } from './dto/update-vehicle.dto.js';
import { VehiclesService } from './vehicles.service.js';

@Controller('vehicles')
export class VehiclesController {

  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getVehicles(@Query() query: GetVehiclesQueryDto) {
    return this.vehiclesService.getVehicles(query);
  }

  @Get(':id')
  getVehicleById(@Param('id') id: string) {
    return this.vehiclesService.getVehicleById(Number(id));
  }

  @Post()
  createVehicle(@Body() vehicle: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(vehicle);
  }

  @Patch(':id')
  updateVehicle(
    @Param('id') id: string,
    @Body() vehicle: UpdateVehicleDto,
  ) {
    return this.vehiclesService.updateVehicle(Number(id), vehicle);
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.deleteVehicle(Number(id));
  }
}