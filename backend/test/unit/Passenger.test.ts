import Passenger from "../../src/domain/Passenger";

test('Deve criar um passageiro', function () {
    const passenger = Passenger.create('John Doe', 'john.doe@gmail.com', '83432616074');
    expect(passenger.passengerId).toBeDefined();
    expect(passenger.name).toBe('John Doe');
    expect(passenger.email.value).toBe('john.doe@gmail.com');
    expect(passenger.document.value).toBe('83432616074');
})

test('Deve deve criar um passageiro com cpf invalido', function () {
    expect(() => Passenger.create('John Doe', 'john.doe@gmail.com', '83432616034')).toThrow(new Error('Invalid cpf'))
})

test('Deve deve criar um passageiro com email invalido', function () {
    expect(() => Passenger.create('John Doe', 'john.doe@gmail', '83432616074')).toThrow(new Error('Invalid Email'))
})
