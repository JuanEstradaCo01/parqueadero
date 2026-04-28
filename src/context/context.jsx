import React, { createContext, useState } from "react";

const parkingContext= createContext({parking:[]});
const Provider = parkingContext.Provider;

function ParkingProvider(props){
    const [typeVehicles, setTypeVehicles] = useState([
        {
            idTypeVehicle: 1,
            code: 101,
            name: "carro",
            hourlyValue: 4000,
            creationDate: "25/06/2024"
        },
        {
            idTypeVehicle: 2,
            code: 102,
            name: "moto",
            hourlyValue: 1500,
            creationDate: "25/06/2024"
        },
        {
            idTypeVehicle: 3,
            code: 103,
            name: "camioneta",
            hourlyValue: 6000,
            creationDate: "25/06/2024"
        }
    ]);
    const [payMethods, setPayMethods] = useState([
        {
            idFormaPago: 1,
            code: 201,
            name: "Efectivo",
        },
        {
            idFormaPago: 2,
            code: 202,
            name: "Tarjeta credito o debito",
        },
        {
            idFormaPago: 3,
            code: 203,
            name: "Transferencia bancaria",
        }
    ]);
    const [banks, setBanks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);

    function addUser(user){
        setUsers([...users, user]);
    }
    
    function addCustomer(customer){
        setCustomers([...customers, customer]);
    }

    function addBank(bank){
        setBanks([...banks, bank]);
    }

    function addVehicle(vehicle){
        setVehicles([...vehicles, vehicle]);
    }

    function addProduct(product){
        setProducts([...products, product]);
    }

    function addService(service){
        setServices([...services, service]);
    }

    function deleteVehicle(plate) {
        const vehicle = vehicles.find(item => item.plate === plate)
        if(!vehicle){
            return (
                alert("El vehículo no se encuentra registrado")
            )
        }

        const index = vehicles.findIndex(item => item.plate === plate)
        let copy = [...vehicles]
        copy.splice(index, 1)
        setVehicles(copy)
    }

    return (
        <Provider value={ { typeVehicles, payMethods, users, addUser, banks, addBank, vehicles, addVehicle, products, addProduct, services, addService, customers, addCustomer, deleteVehicle } }>
            {props.children}
        </Provider>
    )
}

export { parkingContext, ParkingProvider };