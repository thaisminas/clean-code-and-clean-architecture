import {validate} from "../src/EmailValidator";
test('Deve validar o email', function (){
    const email = 'john.doe@gmail.com';
    const isValid = validate(email)
    expect(isValid).toBeTruthy();
})
test('Deve validar um email inválido', function (){
    const email = 'john.doe@gmail';
    const isValid = validate(email)
    expect(isValid).toBeFalsy();
})
