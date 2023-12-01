import Cpf from "../../src/domain/Cpf";


test.each([
       "83432616074",
       "74587887803",
       "87175659520"
])("Deve testar os cpfs válidos", function (cpf: string) {
       const isValid = new Cpf(cpf)
       expect(isValid).toBeTruthy();
});

test.each([
       "83432616076",
       "99999999999",
       "834326160",
       ""
])("Deve testar os cpfs inválidos", function (cpf: string) {
       expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf'))
});
