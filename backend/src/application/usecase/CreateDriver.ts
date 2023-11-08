import crypto from "crypto";
import {validate} from "../../CpfValidator";
import pgp from "pg-promise";
import DriverRepository from "../../infra/repository/DriverRepositoryDatebase";
import Driver from "../../domain/Driver";

export default class CreateDriver {
    constructor(readonly driverRepository: DriverRepository) {

    }

    async execute(input: Input): Promise<Output> {
        const driverId = Driver.create(input.name, input.email, input.document, input.carPlate);
        await this.driverRepository.save(driverId);
        return {
            driverId: driverId.driverId
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
