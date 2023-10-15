import DriverRepository from "../../infra/repository/DriverRepositoryDatebase";

export default class GetDriver {
    constructor(readonly driverRepository: DriverRepository) {
    }
    async execute(input: Input): Promise<Output> {
        const driverData = await this.driverRepository.get(input.driverId);
        return {
            driverId: driverData.driver_id,
            name: driverData.name,
            email: driverData.email,
            document: driverData.document,
            carPlate: driverData.car_plate
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
