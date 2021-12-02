import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import * as PeopleController from "./controllers/PeopleController.js";
import morgan from "morgan";
import Person from "./models/Person.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const viewsDirectory = path.join(__dirname, "views");

const main = async () => {
    await Person.init();

    // view engine setup
    app.set("views", viewsDirectory);
    app.set("view engine", "ejs");

    app.use(morgan("dev"));

    app.get("/", PeopleController.index);
    app.get("/list", PeopleController.list);

    app.listen(8080, () => {
        console.log("app running on port 8080");
    });
};

main();
