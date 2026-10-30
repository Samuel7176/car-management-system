import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import {
  Prisma,
  FuelType as DbFuelType,
  Transmission as DbTransmission,
  VehicleStatus as DbVehicleStatus,
  VehicleType as DbVehicleType,
} from '../generated/prisma/client.js';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { UpdateVehicleDto } from './dto/update-vehicle.dto.js';

import {
  GetVehiclesQueryDto,
  SortOrder,
} from './dto/get-vehicles-query.dto.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicles(query: GetVehiclesQueryDto) {
    const {
      search,
      make,
      status,
      fuelType,
      type,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minRentalPrice,
      maxRentalPrice,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = SortOrder.ASC,
    } = query;

    const where: Prisma.VehicleWhereInput = {};

    if (search) {
      where.OR = [
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (make) {
      where.make = { equals: make, mode: 'insensitive' };
    }

    if (status) {
      where.status = status.toUpperCase() as DbVehicleStatus;
    }

    if (fuelType) {
      where.fuelType = fuelType.toUpperCase() as DbFuelType;
    }

    if (type) {
      where.type = type.toUpperCase() as DbVehicleType;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    if (minYear !== undefined || maxYear !== undefined) {
      where.year = {
        ...(minYear !== undefined && { gte: minYear }),
        ...(maxYear !== undefined && { lte: maxYear }),
      };
    }

    if (
      minRentalPrice !== undefined ||
      maxRentalPrice !== undefined
    ) {
      where.dailyRentalPrice = {
        ...(minRentalPrice !== undefined && { gte: minRentalPrice }),
        ...(maxRentalPrice !== undefined && { lte: maxRentalPrice }),
      };
    }

    const orderBy: Prisma.VehicleOrderByWithRelationInput = sortBy
      ? {
          [sortBy]: sortOrder.toLowerCase() as 'asc' | 'desc',
        }
      : { createdAt: 'desc' };

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: vehicles,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getVehicleById(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async createVehicle(vehicle: CreateVehicleDto) {
    try {
      return await this.prisma.vehicle.create({
        data: {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          registrationNumber: vehicle.registrationNumber,
          mileage: vehicle.mileage ?? 0,
          fuelType: vehicle.fuelType.toUpperCase() as DbFuelType,
          transmission: vehicle.transmission.toUpperCase() as DbTransmission,
          ...(vehicle.status !== undefined && {
            status: vehicle.status.toUpperCase() as DbVehicleStatus,
          }),
          ...(vehicle.type !== undefined && {
            type: vehicle.type.toUpperCase() as DbVehicleType,
          }),
          ...(vehicle.dailyRentalPrice !== undefined && {
            dailyRentalPrice: vehicle.dailyRentalPrice,
          }),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A vehicle with this registration number already exists.',
        );
      }

      throw error;
    }
  }

  async updateVehicle(id: number, vehicle: UpdateVehicleDto) {
    await this.getVehicleById(id);

    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: {
          ...(vehicle.make !== undefined && { make: vehicle.make }),
          ...(vehicle.model !== undefined && { model: vehicle.model }),
          ...(vehicle.year !== undefined && { year: vehicle.year }),
          ...(vehicle.price !== undefined && { price: vehicle.price }),
          ...(vehicle.registrationNumber !== undefined && {
            registrationNumber: vehicle.registrationNumber,
          }),
          ...(vehicle.mileage !== undefined && {
            mileage: vehicle.mileage,
          }),
          ...(vehicle.fuelType !== undefined && {
            fuelType: vehicle.fuelType.toUpperCase() as DbFuelType,
          }),
          ...(vehicle.transmission !== undefined && {
            transmission: vehicle.transmission.toUpperCase() as DbTransmission,
          }),
          ...(vehicle.status !== undefined && {
            status: vehicle.status.toUpperCase() as DbVehicleStatus,
          }),
          ...(vehicle.type !== undefined && {
            type: vehicle.type.toUpperCase() as DbVehicleType,
          }),
          ...(vehicle.dailyRentalPrice !== undefined && {
            dailyRentalPrice: vehicle.dailyRentalPrice,
          }),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A vehicle with this registration number already exists.',
        );
      }

      throw error;
    }
  }

  async deleteVehicle(id: number) {
    const vehicle = await this.getVehicleById(id);

    await this.prisma.vehicle.delete({
      where: { id },
    });

    return {
      message: 'Vehicle deleted successfully',
      vehicle,
    };
  }
}