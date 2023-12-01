// @ts-nocheck
import express, {raw} from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatebase";
import PassengerRepositoryDatebase from "./infra/repository/PassengerRepositoryDatebase";
import MainController from "./infra/http/MainController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const connection = new PgPromiseAdapter();
const calculateRide = new CalculateRide();
const passengerRespository = new PassengerRepositoryDatebase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRespository);
const getPassenger = new GetPassenger(passengerRespository);
const createDriver = new CreateDriver(driverRepository);
const getDriver = new GetDriver(driverRepository);
const httpServer = new ExpressAdapter();
new MainController(httpServer, calculateRide, getPassenger, createDriver, getDriver, createPassenger)

httpServer.listen(3085);
