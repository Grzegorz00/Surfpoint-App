export const clientList = [
    {
        "id": 1,
        "name": "Jan",
        "surname": "Kowalski",
        "age": "jan.kowalski@acme.com",
        "phoneNumber": "jan",
    },
    {
        "id": 2,
        "name": "Adam",
        "surname": "Zieliński",
        "age": "adam.zielinski@acme.com",
        "phoneNumber": "jan",
    },
    {
        "id": 3,
        "name": "Marian",
        "surname": "Nowak",
        "age": "marian.nowak@acme.com",
        "phoneNumber": "jan",
    }
]

export const clientDetailsList = [
    {
        "id": 1,
        "name": "Jan",
        "surname": "Kowalski",
        "age": "jan.kowalski@acme.com",
        "phoneNumber": "jan",
        "courses": [
            {
                "id": 1,
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
        "age": "adam.zielinski@acme.com",
        "phoneNumber": "jan",
        "courses": [
            {
                "id": 2,
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
        "age": "marian.nowak@acme.com",
        "phoneNumber": "jan",
        "courses": []
    }
]