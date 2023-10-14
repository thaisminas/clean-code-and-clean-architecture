import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";

export default class CreateDriver {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const driverId = crypto.randomUUID();
        const {name, email, document, carPlate } = input;
        if(!validate(document)) throw new Error('Invalid cpf');
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driverId, name, email, document, carPlate]);
        await connection.$pool.end();
        return {
            driverId
        }
    }

}


type Input = {
    name: string;
    email: string;
    document: string;
    carPlate: string;
}


type Output = {
    driverId: string;
}
