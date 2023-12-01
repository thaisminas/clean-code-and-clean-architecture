import pgp from "pg-promise";
import DriverRepository from "../../application/respository/DriverRepository";
import Driver from "../../domain/Driver";
import {DatabaseConnection} from "../database/databaseConnection";

export default class DriverRepositoryDatabase implements DriverRepository{
    constructor(readonly connection: DatabaseConnection) {
    }
    async save(driver: Driver){
        await this.connection.query("insert into ccca.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email, driver.document, driver.carPlate]);
    }

    async get(driverId: string): Promise<Driver>{
        const [driverData] = await this.connection.query("select * from ccca.driver where driver_id = $1", [driverId]);
        return new Driver(driverData.driver_id, driverData.name, JSON.parse(driverData.email).value, JSON.parse(driverData.document).value, JSON.parse(driverData.car_plate).value);
    }
}
