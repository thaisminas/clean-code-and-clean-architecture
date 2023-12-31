import axios from "axios";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import PassengerRepositoryDatebase from "../../src/infra/repository/PassengerRepositoryDatebase";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

axios.defaults.validateStatus = function () {
    return true;
};
// test("Se a distância for inválida deve lançar um erro", async function () {
//     const input = {
//         segments: [
//             { distance: -10, date: new Date("2021-03-01T10:00:00") }
//         ]
//     };
//     const response = await axios.post("http://localhost:3085/calculate_ride", input);
//     expect(response.status).toBe(422);
//     const output = response.data;
//     expect(output).toBe("Invalid distance");
// });

test("Deve cadastrar passageiro", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074'
    };
    const response1 = await axios.post("http://localhost:3085/passengers", input);
    const output1 = response1.data;
    expect(output1.passengerId).toBeDefined()
});

test("Não deve cadastrar passageiro com cpf inválido", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:3085/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");
});

test("Deve obter passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const connection = new PgPromiseAdapter();
    const usecase1 = new CreatePassenger(new PassengerRepositoryDatebase(connection));
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetPassenger(new PassengerRepositoryDatebase(connection))
    const output2 = await usecase2.execute({ passengerId: output1.passengerId });
    expect(output2.name).toBe("John Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    await connection.close();
});

test("Deve cadastrar motorista", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        carPlate: 'AAA9999'
    };
    const response1 = await axios.post("http://localhost:3085/drivers", input);
    const output1 = response1.data;
    expect(output1.driverId).toBeDefined()
});

test("Não deve cadastrar o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076",
        carPlate: "AAAA9999"
    };
    const response = await axios.post("http://localhost:3085/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");
});

test("Deve obter motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const response1 = await axios.post("http://localhost:3085/drivers", input);
    const output1 = response1.data;
    const response2 = await axios.get(`http://localhost:3085/drivers/${output1.driverId}`);
    const output2 = response2.data;
    expect(output2.name).toBe("John Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});
