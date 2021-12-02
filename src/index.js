import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import * as PeopleController from "./controllers/PeopleController.js";
import morgan from "morgan";
import Person from "./models/Person.js";
import formidable from "express-formidable";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const viewsDirectory = path.join(__dirname, "views");

// view engine setup
app.set("views", viewsDirectory);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(formidable());

const main = async () => {
    await Person.init();

    app.get("/", PeopleController.list);
    app.post("/", PeopleController.create);
    app.get("/person/:id", PeopleController.one);
    app.post("/person/update", PeopleController.update);
    app.post("/person/delete/:id", PeopleController.deletePerson);

    app.listen(8080, () => {
        console.log("app running on port 8080");
    });
};

main();
