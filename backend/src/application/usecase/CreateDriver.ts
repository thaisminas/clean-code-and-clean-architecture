import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";
import DriverRepository from "../../infra/repository/DriverRepositoryDatebase";

export default class CreateDriver {
    constructor(readonly driverRepository: DriverRepository) {

    }

    async execute(input: Input): Promise<Output> {
        const driverId = crypto.randomUUID();
        if(!validate(input.document)) throw new Error('Invalid cpf');
        await this.driverRepository.save(Object.assign(input, { driverId }))
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
