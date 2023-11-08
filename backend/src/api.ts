// @ts-nocheck
import express, {raw} from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatebase";
import PassengerRepositoryDatebase from "./infra/repository/PassengerRepositoryDatebase";
const app = express();

app.use(express.json());

app.post("/calculate_ride", async function (req, res) {
    try {
        const caculateRide = new CalculateRide();
        const output = await caculateRide.execute(req.body)
        res.json(output);
    } catch (e) {
        res.status(422).send(e.message);
    }
});

app.post('/passengers', async function (req, res){
    try {
       const usecase = new CreatePassenger(new PassengerRepositoryDatebase());
       const output = await usecase.execute(req.body);
       res.json(output);
    }catch (e: any){
        res.status(422).send(e.message);
    }
});

app.get('/passengers/:passengerId', async function (req, res){
    const usecase = new GetPassenger(new PassengerRepositoryDatebase());
    const output = await usecase.execute({passengerId: req.params.passengerId})
    res.json(output)
})

app.post('/drivers', async function (req, res){
    try {
        const usecase = new CreateDriver(new DriverRepositoryDatabase());
        const output = await usecase.execute(req.body)
        res.json(
            output
        )
    }catch (e: any){
        res.status(422).send(e.message);
    }
});

app.get('/drivers/:driverId', async function (req, res){
    const usecase = new GetDriver(new DriverRepositoryDatabase());
    const output = await usecase.execute({ driverId: req.params.driverId })
    res.json(
        output
    )
});

app.post('/calculate_ride', async function (req, res){
    const usecase = new CalculateRide();
    const output = await usecase.execute(req.body)
    res.json(output);
});

app.listen(3085);
