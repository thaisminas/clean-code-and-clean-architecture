import Email from "../../src/domain/Email";
test('Deve validar o email', function (){
    const email = 'john.doe@gmail.com';
    const isValid = new Email(email);
    expect(isValid).toBeTruthy();
})
test('Deve validar um email inválido', function (){
    const email = 'john.doe@gmail';
    expect(() => new Email(email)).toThrow(new Error('Invalid Email'));
})
