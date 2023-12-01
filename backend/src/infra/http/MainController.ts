import HttpServer from "./HttpServer";
import CalculateRide from "../../application/usecase/CalculateRide";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import PassengerRepositoryDatebase from "../repository/PassengerRepositoryDatebase";
import GetPassenger from "../../application/usecase/GetPassenger";
import CreateDriver from "../../application/usecase/CreateDriver";
import DriverRepositoryDatabase from "../repository/DriverRepositoryDatebase";
import GetDriver from "../../application/usecase/GetDriver";

export default class MainController {
    constructor(
        httpServer: HttpServer,
        calculateRide: CalculateRide,
        createPassenger: CreatePassenger,
        getPassenger: GetPassenger,
        createDriver: CreateDriver,
        getDriver: GetDriver
    ) {
        httpServer.on('post', '/calculate_ride', async function (params:any, body: any) {
            return await calculateRide.execute(body)
        })

        httpServer.on('post','/passengers', async function (params:any, body: any){
            return await createPassenger.execute(body);
        });

        httpServer.on('get','/passengers/:passengerId', async function (params:any, body: any){
            return  await getPassenger.execute({passengerId: params.passengerId})
        })

        httpServer.on('post','/drivers', async function (params:any, body: any){
            return  await createDriver.execute(body)
        });

        httpServer.on('get','/drivers/:driverId', async function (params:any, body: any){
            return  await getDriver.execute({ driverId: params.driverId })
        });

        httpServer.on('post','/calculate_ride', async function (params:any, body: any){
            return  await calculateRide.execute(body)
        });
    }

}
