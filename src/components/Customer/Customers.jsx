import "./customers.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customerPlate, setCustomerPlate] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const [contract, setContract] = useState("");
  const [ownerCard, setOwnerCard] = useState("");
  const [identification, setIdentification] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");

  const { customers, addCustomer, deleteCustomer } = useContext(parkingContext);

  const navigate = useNavigate();

  const customerAdded = async (evt) => {
    evt.preventDefault();

    document.getElementById("formCustomer").reset();

    if (customerName === "") {
      alert("Completa todos los campos");
      return;
    }

    let data = {
      idCustomer: customers.length + 1,
      plate: customerPlate,
      typeVehicle: typeVehicle,
      contract: contract,
      ownerCard: ownerCard,
      identification: identification,
      name: customerName,
      priceMonthly,
    };

    const findCustomer = customers.find(item => item.idCustomer === data.idCustomer)

    if(findCustomer){
      data.idCustomer += 1
    }

    addCustomer(data)
    setCustomerPlate("");
    alert("¡Cliente agregado exitosamente!");
  };

  function deleteUserMontly(id) {
    deleteCustomer(id);
  }

  return (
    <>
      <Navbarnav />
      <div className="containerCustomer">
        <h1 className="tittleCustomer">Agregar Clientes</h1>

        <form id="formCustomer">
          <label htmlFor="placa">Nombre</label>
          <input
            placeholder="Nombre del cliente"
            name="placa"
            type="text"
            required
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label htmlFor="placa">Placa</label>
          <input
            placeholder="Placa del vehículo"
            name="placa"
            type="text"
            value={customerPlate}
            required
            onChange={(e) => setCustomerPlate(e.target.value.toUpperCase())}
          />

          <label htmlFor="tipoPago">Tipo de vehículo</label>
          <select
            onChange={(e) => setTypeVehicle(e.target.value)}
            id="tipoPago"
            name="tipoPago"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="carro">carro</option>
            <option value="camioneta">camioneta</option>
            <option value="moto">moto</option>
          </select>

          <label htmlFor="tipoPago">Tipo de contrato</label>
          <select
            onChange={(e) => setContract(e.target.value)}
            id="tipoPago"
            name="tipoPago"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="mensualidad">mensualidad</option>
            <option value="dia">día</option>
          </select>

          <label htmlFor="placa">Tarjeta de propiedad</label>
          <input
            placeholder="Número de tarjeta de propiedad"
            name="placa"
            type="text"
            required
            onChange={(e) => setOwnerCard(e.target.value)}
          />

          <label htmlFor="placa">Identificacion (CC)</label>
          <input
            placeholder="Número de identificación del cliente"
            name="placa"
            type="text"
            required
            onChange={(e) => setIdentification(e.target.value)}
          />

          <label htmlFor="placa">Precio</label>
          <input
            placeholder="Precio"
            name="placa"
            type="text"
            required
            onChange={(e) => setPriceMonthly(e.target.value)}
          />

          <Button onClick={customerAdded} variant="outline-warning">
            Agregar
          </Button>
        </form>

        <div className="table-container">
          {customers.length === 0 ? (
            <>
              <h3>¡No hay clientes registrados!</h3>
            </>
          ) : (
            <div>
              <table className="custom-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Placa</th>
                    <th className="table-header">Tipo</th>
                    <th className="table-header">Contrato</th>
                    <th className="table-header">Tarje. propiedad</th>
                    <th className="table-header">Identificación</th>
                    <th className="table-header">Nombre</th>
                    <th className="table-header">Precio mes</th>
                    <th className="table-header">Editar</th>
                    <th className="table-header">Eliminar</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {customers.map((item) => (
                    <tr className="table-row" key={item.idCustomer}>
                      <td className="table-cell">{item.idCustomer}</td>
                      <td className="table-cell">{item.plate}</td>
                      <td className="table-cell">{item.typeVehicle}</td>
                      <td className="table-cell">{item.contract}</td>
                      <td className="table-cell">{item.ownerCard}</td>
                      <td className="table-cell">{item.identification}</td>
                      <td className="table-cell">{item.name}</td>
                      <td className="table-cell">${item.priceMonthly}</td>
                      <td>
                        <button onClick={() => navigate(`/admin/editarcliente/${item.idCustomer}`)} className="btn btn-primary">Editar</button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteUserMontly(item.idCustomer)}
                          className="btn btn-danger"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Customers;
