import PassengerRepository from "../respository/PassengerRepository";

export default class GetPassenger {
    constructor(readonly passengerRepository: PassengerRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const passenger = await this.passengerRepository.get(input.passengerId);
       return {
           passengerId: passenger.passengerId,
           name: passenger.name,
           email: passenger.email.value,
           document: passenger.document.value
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
