import DriverRepository from "../../infra/repository/DriverRepositoryDatebase";

export default class GetDriver {
    constructor(readonly driverRepository: DriverRepository) {
    }
    async execute(input: Input): Promise<Output> {
        const driver = await this.driverRepository.get(input.driverId);
        return {
            driverId: driver.driverId,
            name: driver.name,
            email: driver.email.value,
            document: driver.document.value,
            carPlate: driver.carPlate
        }
    }

}


type Input = {
    driverId: string
}


type Output = {
    driverId: string
    name: string;
    email: string;
    document: string;
    carPlate: string;
}
