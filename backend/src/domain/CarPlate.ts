export default class CarPlate {
    value: string
    constructor(value: string) {
        if(!this.validate(value)) throw new Error('Invalid Car Plate');
        this.value = value;
    }

    validate(email: string){
        return String(email)
            .toLowerCase()
            .match(
                /^[a-z]{3}[0-9]{4}$/
            );
    }
}
