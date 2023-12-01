// @ts-nocheck
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatebase";
import DriverRepository from "../../src/application/respository/DriverRepository";
import Driver from "../../src/domain/Driver";

test("Deve cadastrar motorista", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        carPlate: 'AAA9999'
    };
    const usecase = new CreateDriver(new DriverRepositoryDatabase())
    const output = await usecase.execute(input)
    expect(output).toBeDefined()
});

// narrow integration test
// test("Deve obter o motorista1", async function () {
//     // fake test pattern
//     const driverRepository: DriverRepository = {
//         async save (driver: any): Promise<void> {
//         },
//         async get (driverId: string): Promise<any> {
//             return Driver.create("John Doe", "john.doe@gmail.com", "83432616074", "AAA9999")
//         }
//     };
//     const input = {
//         name: "John Doe",
//         email: "john.doe@gmail.com",
//         document: "83432616074",
//         carPlate: "AAA9999"
//     };
//     const usecase1 = new CreateDriver(driverRepository);
//     const output1 = await usecase1.execute(input);
//     const usecase2 = new GetDriver(driverRepository);
//     const output2 = await usecase2.execute({ driverId: output1.driverId });
//     expect(output2.name).toBe("John Doe");
//     expect(output2.email).toBe("john.doe@gmail.com");
//     expect(output2.document).toBe("83432616074");
//     expect(output2.carPlate).toBe("AAA9999");
// });


// broad integration test
test("Deve obter o motorista", async function () {
    const driverRepository: DriverRepository = {
        async save(driver: any): Promise<void>{
        },
        async get(driverId: string): Promise<any>{
            return Driver.create("John Doe", "john.doe@gmail.com", "83432616074", "AAA9999");
        }
    }

    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const usecase1 = new CreateDriver(driverRepository);
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetDriver(driverRepository);
    const output2 = await usecase2.execute({ driverId: output1.driverId });
    expect(output2.name).toBe("John Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});
