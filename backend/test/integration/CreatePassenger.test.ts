import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRepositoryDatebase from "../../src/infra/repository/PassengerRepositoryDatebase";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

test("Deve cadastrar passageiro", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074'
    };
    const connection = new PgPromiseAdapter();
    const usecase = new CreatePassenger(new PassengerRepositoryDatebase(connection));
    const output = await usecase.execute(input);
    expect(output).toBeDefined();
    await connection.close();
});

test("Não deve cadastrar passageiro com email inválido", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail',
        document: '83432616074'
    };
    const connection = new PgPromiseAdapter();
    const usecase = new CreatePassenger(new PassengerRepositoryDatebase(connection));
    await expect(async () => await usecase.execute(input)).rejects.toThrow(new Error('Invalid Email'));
    await connection.close();
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
    const output2 = await usecase2.execute({ passengerId: output1.passengerId});
    expect(output2.name).toBe("John Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    await connection.close();
});
