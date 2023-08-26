// @ts-nocheck
import express, {raw} from "express";
import { calculate } from "./RideCalculator";
import Ride from "./Ride";
import * as crypto from "crypto";
import pgp from "pg-promise";
import {validate} from "./CpfValidator";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
    try {
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        res.json({ price });
    } catch (e) {
        res.status(422).send(e.message);
    }
});

app.post('/passengers', async function (req, res){
    try {
        const {name, email, document } = req.body;
        const passengerId = crypto.randomUUID();
        if(!validate(req.body.document)) throw new Error('Invalid cpf');
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passengerId, name, email, document]);
        await connection.$pool.end();
        res.json({
            passengerId
        })
    }catch (e: any){
        res.status(422).send(e.message);
    }
});

app.get('/passengers/:passengerId', async function (req, res){
    const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
    const [passengerData] = await connection.query("select * from ccca.passenger where passenger_id = $1", [req.params.passengerId]);
    await connection.$pool.end();
    res.json({passengerData})
})

app.post('/drivers', async function (req, res){
    try {
        const {name, email, document, carPlate } = req.body;
        const driverId = crypto.randomUUID();
        if(!validate(req.body.document)) throw new Error('Invalid cpf');
        const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
        await connection.query("insert into ccca.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driverId, name, email, document, carPlate]);
        await connection.$pool.end();
        res.json({
            driverId
        })
    }catch (e: any){
        res.status(422).send(e.message);
    }
});

app.get('/drivers/:driverId', async function (req, res){
    const connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
    const [driverData] = await connection.query("select * from ccca.driver where driver_id = $1", [req.params.driverId]);
    await connection.$pool.end();
    res.json({driverData})
})

app.listen(3085);
