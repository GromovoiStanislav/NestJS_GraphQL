import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as jwt from "jsonwebtoken";
import { TripUpdateResponseModel, UserModel } from "./user.models";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService
  ) {
  }

  createToken({ id, email }: UserEntity) {
    const secret = this.configService.get("JWT_SECRET");
    return jwt.sign({ id, email }, secret);
  }

  createUser(email: string) {
    return this.userRepo.create({ email, trips: [] }).save();
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async addTrips(ids: number[], { email }: UserModel): Promise<TripUpdateResponseModel> {
    try {
      const user = await this.getUserByEmail(email);
      user.trips = Array.from(new Set(user.trips.concat(ids)));
      await user.save();
      return {
        success: true,
        message: `Sucessfully added trips with ids: ${ids.join(", ")}`,
        launches: ids
      };
    } catch (err) {
      return this.createTripUpdateError(`Error: ${err}`, ids);
    }
  }

  async removeTrip(id: number, { email }: UserModel): Promise<TripUpdateResponseModel> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user.trips.includes(Number(id))) {
        return this.createTripUpdateError(
          "Cannot cancel trip that is not booked",
          [id]
        );
      }
      user.trips = user.trips.filter(t => t !== Number(id));
      await user.save();
      return {
        success: true,
        message: `Sucessfully removed trip with id: ${id}`,
        launches: [id]
      };
    } catch (err) {
      return this.createTripUpdateError(`Error: ${err}`, [id]);
    }
  }

  private createTripUpdateError(message: string, launches: number[]): TripUpdateResponseModel {
    return { success: false, message, launches };
  }

}