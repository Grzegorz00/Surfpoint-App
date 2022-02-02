export const instructorList = [
    {
        "id": 1,
        "name": "Jan",
        "surname": "Kowalski",
        "email": "jan.kowalski@acme.com",
        "sport": "jan",
        "price": "34",
    },
    {
        "id": 2,
        "name": "Adam",
        "surname": "Zieliński",
        "email": "adam.zielinski@acme.com",
        "sport": "jan",
        "price": "34",
    },
    {
        "id": 3,
        "name": "Marian",
        "surname": "Nowak",
        "email": "marian.nowak@acme.com",
        "sport": "jan",
        "price": "34",
    }
]

export const instructorDetailsList = [
    {
        "id": 1,
        "name": "Jan",
        "surname": "Kowalski",
        "email": "jan.kowalski@acme.com",
        "sport": "jan",
        "price": "34",
        "courses": [
            {
                "id": 1,
                "salary": "5000.00",
                "dateFrom": "2001-01-01T00:00:00.000Z",
                "dateTo": "2009-01-01T00:00:00.000Z",
                "instructorId": 1,
                "clientId": 1,
                "client": {
                    "id": 1,
                    "name": "HR",
                    "surname": "500000.00",
                }
            },
            {
                "id": 3,
                "salary": "3000.00",
                "dateFrom": "2009-01-02T00:00:00.000Z",
                "dateTo": null,
                "instructorId": 1,
                "clientId": 1,
                "client": {
                    "id": 2,
                    "name": "Sales",
                    "surname": "2000000.00",
                }
            }
        ]
    },
    {
        "id": 2,
        "name": "Adam",
        "surname": "Zieliński",
        "email": "adam.zielinski@acme.com",
        "sport": "jan",
        "price": "34",
        "courses": [
            {
                "id": 2,
                "salary": "4000.00",
                "dateFrom": "2001-02-01T00:00:00.000Z",
                "dateTo": "2009-02-01T00:00:00.000Z",
                "instructorId": 1,
                "clientId": 1,
                "client": {
                    "id": 1,
                    "name": "HR",
                    "surname": "500000.00",
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "Marian",
        "surname": "Nowak",
        "email": "marian.nowak@acme.com",
        "sport": "jan",
        "price": "34",
        "courses": []
    }
]