# TODO REST API 

This is a simple REST API for a todo app.

## Install

    npm install

## Run the app

    npm start

## Run the tests

    npm run test

## Get list of todos

### Request

`GET /api/todos`

    get http://localhost:3000/api/todos

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 675
    ETag: W/"2a3-kgJ5LiXsa9ZBGx+GTOvtgMaWnis"
    Date: Thu, 18 Jun 2020 18:11:36 GMT
    Connection: close   

```
[
    {
        "id": 1,
        "name": "Eating noddles",
        "completed": true,
        "description": "Noodles are a type of food made from unleavened dough which is..."
    },
    .
    .
    .
]
```

## Create a new todo

### Request

`POST /api/todos`

    post http://localhost:3000/api/todos
    Content-Type: application/json

```
{
    "name": "Doing assessment",
    "completed": false
}
```

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 52
    ETag: W/"34-xUQqh9heEhPO4uH4i7BBa5z+HDc"
    Date: Thu, 18 Jun 2020 18:24:44 GMT
    Connection: close

```
{
  "id": 5,
  "name": "Doing assessment",
  "completed": false
}
```

## Update a todo

### Request

`POST /api/todos/:id`

    post http://localhost:3000/api/todos
    Content-Type: application/json

```
{
    "name": "Updated todo",
    "completed": false
}
```

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 152
    ETag: W/"98-AXrbdOgw+YgjU6TysNII7yQ84BI"
    Date: Thu, 18 Jun 2020 18:36:31 GMT
    Connection: close

```
{
  "id": 4,
  "name": "Updated todo",
  "completed": false,
  "description": "Coding is basically the computer language used to develop apps..."
}
```

## Delete a todo

### Request

`DELETE /api/todos/:id`

    post http://localhost:3000/api/todos/1
    Content-Type: application/json

### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Date: Thu, 18 Jun 2020 18:38:29 GMT
    Connection: close
