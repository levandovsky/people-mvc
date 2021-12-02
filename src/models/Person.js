import {getConnection} from "../database/mysql.js";

const defaultParams = {
    limit: 5,
    sort: "ASC",
};

export default class Person {
    // create a person
    static async create(name, lastname, age) {
        try {
            const connection = await getConnection();

            const [{insertId}] = await connection.query(
                `INSERT INTO people (name, lastname, age)
                VALUES ('${name}', '${lastname}', ${age});`
            );

            await connection.end();

            return {
                name,
                lastname,
                age,
                insertId,
            };
        } catch (error) {
            throw new Error("Couldn't create a person", error.message);
        }
    }

    // update person by id
    static async update(id, {name, lastname, age}) {
        try {
            const connection = await getConnection();

            const [{affectedRows}] = await connection.query(
                `
                UPDATE ??
                SET name = ?, lastname = ?, age = ?
                WHERE id= ?;
                `,
                ["people", name, lastname, age, id]
            );

            await connection.end();

            return !!affectedRows;
        } catch (error) {
            throw new Error(`Couldn't update a person with id: ${id}`, error.message);
        }
    }

    // get all people from db
    static async getAll({limit, sort} = defaultParams) {
        try {
            const connection = await getConnection();
            const fields = ["name", "lastname", "age", "id"];

            const queryString = `SELECT ?? FROM ??
                ORDER BY name ${sort}
                LIMIT ${limit}`;

            const [people] = await connection.query(queryString, [fields, "people"]);

            await connection.end();

            return people;
        } catch (error) {
            throw new Error("Couldn't get all people", error.message);
        }
    }

    // gets one person by id
    static async getOneById(id) {
        try {
            const connection = await getConnection();

            const [results] = await connection.query("SELECT * FROM people WHERE id=?", [id]);

            const [person] = results;

            return person;
        } catch (error) {
            throw new Error("Couldn't get all people", error.message);
        }
    }

    // delete person by id
    static async delete(id) {
        try {
            const connection = await getConnection();
            const [{affectedRows}] = await connection.query(`DELETE FROM people WHERE id=${id};`);

            return !!affectedRows;
        } catch (error) {
            throw new Error(`Couldn't delete a person with id: ${id}`, error.message);
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
