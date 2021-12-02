import {getConnection} from "../database/mysql.js";

const defaultParams = {
    limit: 5,
    sort: "ASC",
};

export default class Person {
    constructor(name, lastname, age) {}

    // get all people from db
    static async getAll({limit, sort} = defaultParams) {
        try {
            const connection = await getConnection();
            const fields = ["name", "lastname", "age"];

            const queryString = `SELECT ?? FROM ??
                ORDER BY name ${sort}
                LIMIT ${limit}`;

            const [people] = await connection.query(queryString, [fields, "people"]);

            return people;
        } catch (error) {
            throw new Error("Couldn't get all people", error);
        }
    }

    // init database
    static async init() {
        try {
            const connection = await getConnection();
            const query = `
            CREATE TABLE IF NOT EXISTS people (
                id INTEGER AUTO_INCREMENT NOT NULL,
                name VARCHAR(20) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                age INTEGER NOT NULL,
                PRIMARY KEY (id)
            )`;

            await connection.query(query);

            console.log("created table people");

            await connection.end();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
