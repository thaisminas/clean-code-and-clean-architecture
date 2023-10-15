// @ts-nocheck
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import sinon from 'sinon'
import DriverRepository from "../../src/infra/repository/DriverRepositoryDatebase";
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
    const stubSave = sinon.stub(DriverRepository.prototype, 'save').resolves({})
    const usecase1 = new CreateDriver()
    const output1 = await usecase1.execute(input)
    stubSave.restore()
    const stubGet = sinon.stub(DriverRepository.prototype, 'get').resolves({
        driver_id: output1.driverId,
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074',
        car_plate: 'AAAA999'
    })

    const usecase2 = new GetDriver()
    const output2 = await usecase2.execute({ driverId: output1.driverId })
    stubGet.restore()
    expect(output2.name).toBe("john Doe");
    expect(output2.email).toBe("john.doe@gmail.com");
    expect(output2.document).toBe("83432616074");

});
