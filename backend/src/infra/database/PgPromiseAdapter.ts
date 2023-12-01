import pgp from "pg-promise";
import {DatabaseConnection} from "./databaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection{
    private connection: any;
    constructor() {
        this.connection = pgp()('postgres://root:root@127.0.0.1:5441/cc-ca');
    }
    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    async close(): Promise<void> {
        await this.connection.$pool.end();
    }



}



