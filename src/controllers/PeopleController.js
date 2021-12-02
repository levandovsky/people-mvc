import Person from "../models/Person.js";

export const index = (req, res) => {
    res.render("index");
};

export const list = async (req, res) => {
    try {
        const people = await Person.getAll();

        res.render("people/all", {people});
    } catch (error) {
        res.render("errors/500", {message: error.message});
    }
};
