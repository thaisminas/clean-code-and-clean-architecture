import Driver from "../../src/domain/Driver";

test('Deve criar um motorista', function () {
    const driver = Driver.create('John Doe', 'john.doe@gmail.com', '83432616074', 'AAA9999');
    expect(driver.driverId).toBeDefined();
    expect(driver.name).toBe('John Doe');
    expect(driver.email.value).toBe('john.doe@gmail.com');
    expect(driver.document.value).toBe('83432616074');
    expect(driver.carPlate.value).toBe('AAA9999');
})

test('Não deve deve criar um motorista com cpf invalido', function () {
    expect(() => Driver.create('John Doe', 'john.doe@gmail.com', '83432616034', 'AAA9999')).toThrow(new Error('Invalid cpf'))
})

test('Não veve deve criar um motorista com email invalido', function () {
    expect(() => Driver.create('John Doe', 'john.doe@gmail', '83432616074', 'AAA9999')).toThrow(new Error('Invalid Email'))
})

test('Não pode criar um motorista com placa invalida', function () {
    expect(() => Driver.create('John Doe', 'john.doe@gmail.com', '83432616074', 'AAA999')).toThrow(new Error('Invalid Car Plate'))
})
