import CreatePassenger from "./application/usecase/CreatePassenger";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import PassengerRepositoryDatebase from "./infra/repository/PassengerRepositoryDatebase";
process.stdin.on("data", async function (chunk) {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith('create-passenger')) {
        try{
            const [name, email, document] = command.replace('create-passenger', '').split("");
            const connection = new PgPromiseAdapter();
            const usecase = new CreatePassenger(new PassengerRepositoryDatebase(connection));
            const output = await usecase.execute({name, email, document})
            console.log(output)
        } catch (e: any){
            console.log(e.message);
        }

    }
})
