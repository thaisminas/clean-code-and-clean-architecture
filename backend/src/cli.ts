import pgp from "pg-promise";
import {validate} from "./CpfValidator";
import * as crypto from "crypto";
import CreatePassenger from "./application/usecase/CreatePassenger";
process.stdin.on("data", async function (chunk) {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith('create-passenger')) {
        try{
            const [name, email, document] = command.replace('create-passenger', '').split("");
            const usecase = new CreatePassenger();
            const output = await usecase.execute({name, email, document})
            console.log(output)
        } catch (e: any){
            console.log(e.message);
        }

    }
})
