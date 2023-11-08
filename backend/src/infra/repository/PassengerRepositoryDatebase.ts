import pgp from "pg-promise";
import PassengerRepository from "../../application/respository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export default class PassengerRepositoryDatebase implements PassengerRepository{
    async save(passenger: Passenger){
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value]);
        await connection.$pool.end();
    }

    async get(passengerId: string): Promise<Passenger>{
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        const [passengerData] = await connection.query("select * from ccca.passenger where passenger_id = $1", [passengerId]);
        await connection.$pool.end();
        return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document)
    }
}
