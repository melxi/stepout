const supertest = require('supertest'),
    app = require('../app'),
    api = supertest(app);

let initialTodos = [
    {
        id: 1,
        name:'Eating noddles',
        completed: true,
        description: 'Noodles are a type of food made from unleavened dough which is rolled flat and cut, stretched or extruded, into long strips or strings.',
    },
    {
        id: 2,
        name:'Go to grocery',
        completed: false,
        description: 'A grocery store or grocer\'s shop is a retail shop that primarily sells food, either fresh or preserved.',
    },
    {
        id: 3,
        name:'Watching Netflix',
        completed: false,
        description: 'Netflix, Inc. is an American media-services provider and production company',
    },
    {
        id: 4,
        name:'Doing some coding',
        completed: true,
        description: 'Coding is basically the computer language used to develop apps, websites, and software.'
    }
];

describe('Todos API', () => {
    // GET route
    test('todos are returned as json', async () => {
        await api
            .get('/api/todos')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all todos are returned', async () => {
        const response = await api.get('/api/todos');

        expect(response.body.length).toBe(initialTodos.length);
    });

    // POST route
    test('a todo without name is not created', async () => {
        const todo = {
            completed: false
        };

        await api
            .post('/api/todos')
            .send(todo)
            .expect(400);

        const response = await api.get('/api/todos');

        expect(response.body.length).toBe(initialTodos.length);
    });
    // POST route
    test('create a new todo', async () => {
        const todo = {
            name: 'New todo',
            completed: false
        };

        await api
            .post('/api/todos')
            .send(todo)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/todos');
        const names = response.body.map(todo => todo.name);

        expect(response.body.length).toBe(initialTodos.length + 1);
        expect(names).toContain('New todo');
    });


    // PUT route
    test('a todo can be updated', async () => {
        const todoToUpdate = initialTodos[0];

        const todo = {
            ...todoToUpdate,
            completed: false
        };

        await api
            .put(`/api/todos/${todoToUpdate.id}`)
            .send(todo)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const responseAfter = await api.get('/api/todos');
        const todosAfter = responseAfter.body.map(todo => todo);
        const updatedTodo = todosAfter[0];

        expect(todoToUpdate.completed).not.toBe(updatedTodo.completed);
    });

    // DETELE route
    test('a todo can be deleted', async () => {
        const responseBefore = await api.get('/api/todos');
        const todosBefore = responseBefore.body.map(todo => todo);
        const todoToDelete = todosBefore[0];

        await api
            .delete(`/api/todos/${todoToDelete.id}`)
            .expect(204);

        const responseAfter = await api.get('/api/todos');
        const todosAfter = responseAfter.body.map(todo => todo);

        expect(todosAfter.length).toBe(todosBefore.length - 1);
    });



    test('each todo has an id', async () => {
        const response = await api.get('/api/todos');
        const identifiers = response.body.map(todo => todo.id);

        identifiers.forEach(id => {
            expect(id).toBeDefined();
        });
    });

    test('each todo has a name property', async () => {
        const response = await api.get('/api/todos');
        const names = response.body.map(todo => todo.name);

        names.forEach(name => {
            expect(name).toBeDefined();
        });
    });

    test('each todo has a completed property', async () => {
        const response = await api.get('/api/todos');
        const completions = response.body.map(todo => todo.completed);

        completions.forEach(completed => {
            expect(completed).toBeDefined();
        });
    });

    test('filter todos by only completed ones', async () => {
        const response = await api.get('/api/todos/filter?completed=true');
        const completions = response.body.map(todo => todo.completed);

        completions.forEach(completed => {
            expect(completed).toBeTruthy();
        });
    });

    test('find todo based on description', async () => {
        const searchValue = 'coding';
        const response = await api.get(`/api/todos/search?description=${searchValue}`);
        const descriptions = response.body.map(todo => todo.description.toLowerCase());

        descriptions.forEach(description => {
            expect(description).toContain(searchValue);
        });
    });
});