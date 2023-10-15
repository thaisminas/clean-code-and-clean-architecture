import pgp from "pg-promise";
import DriverRepository from "../../application/respository/DriverRepository";

export default class DriverRepositoryDatabase implements DriverRepository{
    async save(driver: any){
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email, driver.document, driver.carPlate]);
        await connection.$pool.end();
    }

    async get(driverId: string){
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        const [driverData] = await connection.query("select * from ccca.driver where driver_id = $1", [driverId]);
        await connection.$pool.end();
        return driverData;
    }
}
