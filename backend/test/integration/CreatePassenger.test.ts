import axios from "axios/index";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";

test("Deve cadastrar passageiro", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074'
    };
    const usecase = new CreatePassenger();
    const output = await usecase.execute(input);
    expect(output).toBeDefined();
});

test("Deve obter passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const usecase1 = new CreatePassenger();
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetPassenger()
    const output2 = await usecase2.execute({ passengerId: output1.passengerId});
    expect(output2.name).toBe("John Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
});
