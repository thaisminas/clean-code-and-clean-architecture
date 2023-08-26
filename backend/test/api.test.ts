import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3085/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {
    const input = {
        segments: [
            { distance: -10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3085/calculate_ride", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid distance");
});

test("Deve cadastrar passageiro", async function () {
    const input = {
        name: 'john Doe',
        email: 'john.doe@gmail.com',
        document: '83432616074'
    };
    const response1 = await axios.post("http://localhost:3085/passagers", input);
    const output1 = response1.data;
    expect(output1.passengerId).toBeDefined()

    const response2 = await axios.get(`http://localhost:3085/passagers/${output1.passengerId}`)
    const output2 = response2.data;
    expect(output2.name).toBe('john Doe');
    expect(output2.email).toBe('john.doe@gmail.com');
    expect(output2.document).toBe('83432616074')
});


