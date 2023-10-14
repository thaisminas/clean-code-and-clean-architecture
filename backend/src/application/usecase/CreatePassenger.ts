import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";

export default class CreatePassenger {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const passengerId = crypto.randomUUID();
        if(!validate(input.document)) throw new Error('Invalid cpf');
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passengerId, input.name, input.email, input.document]);
        await connection.$pool.end();
        return {
            passengerId
        }
    }

}


type Input = {
    name: string;
    email: string;
    document: string;
}


type Output = {
    passengerId: string;
}
