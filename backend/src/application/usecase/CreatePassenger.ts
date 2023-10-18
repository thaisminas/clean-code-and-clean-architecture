import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";
import PassengerRepository from "../respository/PassengerRepository";

export default class CreatePassenger {
    constructor(readonly passengerRepository: PassengerRepository) {

    }

    async execute(input: Input): Promise<Output> {
        const passengerId = crypto.randomUUID();
        if(!validate(input.document)) throw new Error('Invalid cpf');
        await this.passengerRepository.save(Object.assign(input, { passengerId }))
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
