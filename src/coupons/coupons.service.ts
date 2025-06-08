import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { endOfDay, format, formatDistanceToNow, isAfter, isSameDay } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>
  ) { }
  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto)
  }

  findAll() {
    return this.couponRepository.find()
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id })
    if (!coupon) throw new NotFoundException('El coupon no existe')
    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id)
    Object.assign(coupon, updateCouponDto)
    return this.couponRepository.save(coupon)
  }

  async remove(id: number) {
    const coupon = await this.findOne(id)
    await this.couponRepository.remove(coupon)
    return { message: 'Cupon eliminado correctamente' }
  }

  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name });
    if (!coupon) throw new NotFoundException('El cupón no existe');

    // 1. Asegurar que la fecha de expiración sea tratada como local
    const expirationDate = new Date(coupon.expirationDate);
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationDate.getTimezoneOffset());

    // 2. Calcular el final del día LOCAL
    const expirationEndOfDay = endOfDay(expirationDate);

    // 3. Fecha actual LOCAL (sin conversión UTC)
    const now = new Date();

    // console.log('Ahora REAL local:', now);
    // console.log('Válido hasta REAL local:', expirationEndOfDay);

    // 4. Comparación correcta
    if (isAfter(now, expirationEndOfDay)) {
      throw new UnprocessableEntityException(`Cupón expiró el ${expirationEndOfDay.toLocaleDateString()}`);
    }

    return {
      message: `Cupón válido hasta el ${expirationEndOfDay.toLocaleDateString()} a las 23:59:59`,
      ...coupon
    };
  }
}
