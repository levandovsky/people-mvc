import Person from "../models/Person.js";

export const list = async (req, res) => {
    try {
        const people = await Person.getAll();

        res.render("people/all", {people});
    } catch (error) {
        res.status(500).render("errors/500", {message: error.message});
    }
};

export const one = async (req, res) => {
    const {id} = req.params;

    try {
        const person = await Person.getOneById(id);

        if (!person) {
            return res.render("errors/404", {message: `No person with id: ${id}`});
        }

        res.render("people/one", {person});
    } catch (error) {
        res.status(500).render("errors/500", {message: error.message});
    }
};

export const create = async (req, res) => {
    const {name, lastname, age} = req.fields;

    try {
        await Person.create(name, lastname, age);

        res.redirect("/");
    } catch (error) {
        res.status(500).render("errors/500", {message: error.message});
    }
};

export const update = async (req, res) => {
    const {name, lastname, age, id} = req.fields;

    try {
        const updated = await Person.update(id, {name, lastname, age});

        if (!updated) {
            return res.status(404).render("errors/404", {message: `No person with id: ${id}`});
        }

        res.redirect("/");
    } catch (error) {
        res.status(500).render("errors/500", {message: error.message});
    }
};

export const deletePerson = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const deleted = await Person.delete(id);

        if (!deleted) {
            return res.status(404).render("errors/404", {message: `No person with id: ${id}`});
        }

        res.redirect("/");
    } catch (error) {
        res.status(500).render("errors/500", {message: error.message});

    }
};
