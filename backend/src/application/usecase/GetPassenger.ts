import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";

export default class GetPassenger {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        const [passengerData] = await connection.query("select * from ccca.passenger where passenger_id = $1", [input.passengerId]);
        await connection.$pool.end();
       return {
           passengerId: passengerData.passenger_id,
           name: passengerData.name,
           email: passengerData.email,
           document: passengerData.document
       };
    }

}


type Input = {
    passengerId: string;
}


type Output = {
    passengerId: string;
    name: string;
    email: string;
    document: string;
}
