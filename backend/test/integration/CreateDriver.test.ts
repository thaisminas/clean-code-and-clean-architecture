import axios from "axios/index";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";

test("Deve cadastrar motorista", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        carPlate: 'AAAA999'
    };
    const usecase = new CreateDriver()
    const output = await usecase.execute(input)
    expect(output).toBeDefined()
});

test("Deve obter o motorista", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        carPlate: 'AAAA999'
    };
    const usecase1 = new CreateDriver()
    const output1 = await usecase1.execute(input)
    const usecase2 = new GetDriver()
    const output2 = await usecase2.execute({ driverId: output1.driverId })
    expect(output2.name).toBe("john Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
});
