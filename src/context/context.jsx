import React, { createContext, useState } from "react";

const parkingContext = createContext({ parking: [] });
const Provider = parkingContext.Provider;

function ParkingProvider(props) {
  const [typeVehicles, setTypeVehicles] = useState([
    {
      idTypeVehicle: 1,
      code: 101,
      name: "carro",
      hourlyValue: 4000,
      creationDate: "25/06/2024",
    },
    {
      idTypeVehicle: 2,
      code: 102,
      name: "moto",
      hourlyValue: 1500,
      creationDate: "25/06/2024",
    },
    {
      idTypeVehicle: 3,
      code: 103,
      name: "camioneta",
      hourlyValue: 6000,
      creationDate: "25/06/2024",
    },
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
    },
  ]);
  const [banks, setBanks] = useState([
    {
      idBank: 1,
      code: 301,
      name: "Banco de Bogotá",
    },
    {
      idBank: 2,
      code: 302,
      name: "Banco de Occidente",
    },
    {
      idBank: 3,
      code: 303,
      name: "Banco Popular",
    },
  ]);
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([
    {
      idCajero: 1,
      identificacion: 123456789,
      username: "admin",
      phone: "1234567890",
      idCiudad: 19701,
      email: "admin@example.com",
      fechaCreacion: "02/05/2026",
      password: "123",
    }
  ]);
  const [vehicles, setVehicles] = useState([]);
  const [products, setProducts] = useState([
    {
      idProduct: 1,
      code: 401,
      name: "Candado de seguridad",
      price: 10000,
    },
    {
      idProduct: 2,
      code: 402,
      name: "Carpa para motocicleta",
      price: 15000,
    },
    {
      idProduct: 3,
      code: 403,
      name: "Shampoo PH neutro para vehículos",
      price: 20000,
    },
    {
      idProduct: 4,
      code: 404,
      name: "Cera para carrocería",
      price: 25000,
    },
    {
      idProduct: 5,
      code: 405,
      name: "Limpiador de llantas",
      price: 12000,
    },
  ]);
  const [services, setServices] = useState([
    {
      idService: 1,
      code: 501,
      name: "Lavado sencillo Carro",
      price: 25000,
    },
    {
      idService: 2,
      code: 502,
      name: "Lavado sencillo Moto",
      price: 15000,
    },
    {
      idService: 3,
      code: 503,
      name: "Lavado sencillo Camioneta",
      price: 35000,
    },
    {
      idService: 4,
      code: 504,
      name: "Lavado completo Carro",
      price: 50000,
    },
    {
      idService: 5,
      code: 505,
      name: "Lavado completo Moto",
      price: 30000,
    },
    {
      idService: 6,
      code: 506,
      name: "Lavado completo Camioneta",
      price: 70000,
    },
    {
      idService: 7,
      code: 507,
      name: "Encerada Carro o Camioneta",
      price: 40000,
    },
    {
      idService: 8,
      code: 508,
      name: "Encerada Moto",
      price: 20000,
    },
    {
      idService: 9,
      code: 509,
      name: "Pulida Carro o camioneta",
      price: 60000,
    },
    {
      idService: 10,
      code: 510,
      name: "Pulida Moto",
      price: 30000,
    },
    {
      idService: 11,
      code: 511,
      name: "Cambio de aceite Carro o Camioneta",
      price: 80000,
    },
    {
      idService: 12,
      code: 512,
      name: "Cambio de aceite Moto",
      price: 40000,
    },
  ]);
  const [session, setSession] = useState([]);

  function addUser(user) {
    setUsers([...users, user]);
  }

  function editUserId(updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map(user =>
        user.idCajero === updatedUser.idCajero ? updatedUser : user
      )
    )
  }

  function addCustomer(customer) {
    setCustomers([...customers, customer]);
  }

  function addVehicle(vehicle) {
    setVehicles([...vehicles, vehicle]);
  }

  function addSession(user) {
    setSession([...session, user]);
  }

  function logOut() {
    setSession([]);
  }

  function deleteVehicle(plate) {
    const vehicle = vehicles.find((item) => item.plate === plate);
    if (!vehicle) {
      return alert("El vehículo no se encuentra registrado");
    }

    const index = vehicles.findIndex((item) => item.plate === plate);
    let copy = [...vehicles];
    copy.splice(index, 1);
    setVehicles(copy);
  }

  function deleteUser(id){
    const user = users.find((item) => item.idCajero === id)

    const index = users.findIndex((item) => item.idCajero === id)
    let copy = [...users]
    copy.splice(index, 1)
    setUsers(copy)
  }

  return (
    <Provider
      value={{
        typeVehicles,
        payMethods,
        users,
        addUser,
        banks,
        vehicles,
        addVehicle,
        products,
        services,
        customers,
        addCustomer,
        deleteVehicle,
        session,
        addSession,
        logOut,
        editUserId,
        deleteUser
      }}
    >
      {props.children}
    </Provider>
  );
}

export { parkingContext, ParkingProvider };
