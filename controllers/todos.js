const todosRouter = require('express').Router();
let todo = require('../models/todo');

todosRouter.get('/', (req, res, next) => {
    try {
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
});

todosRouter.get('/filter', (req, res, next) => {
    try {
        const completedTodos = todo
            .filter(todo => todo.completed == Boolean(req.query.completed));

        res.status(200).json(completedTodos);
    } catch (err) {
        next(err);
    }
});

todosRouter.get('/sortBy', (req, res, next) => {
    try {
        const { name } = req.query;
        const sortedTodos = todo
            .sort((a, b) => {
                if (name === 'asc') {
                    return a.name < b.name ? - 1 : Number(a.name > b.name);
                } else if (name === 'desc') {
                    return a.name > b.name ? - 1 : Number(a.name < b.name);
                }
            });

        res.status(200).json(sortedTodos);
    } catch (err) {
        next(err);
    }
});

todosRouter.get('/search', (req, res, next) => {
    try {
        const { description } = req.query;
        const searchedTodos = todo.reduce((acc, curr) => {
            if (curr.description &&
                curr.description.toLowerCase().indexOf(description) > -1) {
                acc.push(curr);
            }

            return acc;
        }, []);

        res.status(201).json(searchedTodos);
    } catch (err) {
        next(err);    }
});


todosRouter.post('/', (req, res, next) => {
    try {
        const { name, completed } = req.body;

        if (!name) {
            return res.status(400).send({ error: 'Name is required' });
        }

        const newTodo = {
            id: todo.length + 1,
            name,
            completed: completed || false,
        };

        todo.push(newTodo);

        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400);
        next(err);
    }
});

todosRouter.put('/:id', (req, res, next) => {
    try {
        const { name, completed } = req.body;
        const { id } = req.params;

        let todoToUpdate = todo.find(todo => todo.id == id);

        if (!todoToUpdate) {
            return res.status(404).send({ error: 'Todo doesn\'t exist' });
        }

        const updateTodo = {
            ...todoToUpdate,
            name,
            completed
        };

        todo = todo.map(obj =>
            obj.id == id ? { ...obj, name, completed } : obj
        );

        res.status(201).json(updateTodo);
    } catch (err) {
        next(err);
    }
});

todosRouter.delete('/:id', (req, res, next) => {
    try {
        const { id } = req.params;

        if (!todo.some(todo => todo.id == id)) {
            return res.status(404).send({ error: 'Todo doesn\'t exist' });
        }

        todo = todo.filter(todo => todo.id != id);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = todosRouter;