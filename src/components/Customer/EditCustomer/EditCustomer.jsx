import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { parkingContext } from "../../../context/context.jsx";
import Navbarnav from "../../Nav/Navbarnav.jsx";

//Componente que permite editar un cliente desde el administrador
function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { customers, editCustomerId } = useContext(parkingContext);
  const customer = customers.find((item) => item.idCustomer === parseInt(id));

  //Variables
  const [customerName, setCustomerName] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [customerPlate, setCustomerPlate] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const [contract, setContract] = useState("");
  const [ownerCard, setOwnerCard] = useState("");
  const [identification, setIdentification] = useState("");

  //Funcion que edita un cliente por su id
  const editCustomer = async (evt) => {
    evt.preventDefault();

    document.getElementById("form-container").reset();

    //Formateo del objeto cliente a editar
    let data = {
      idCustomer: customer.idCustomer,
      plate: customerPlate || customer.plate,
      typeVehicle: typeVehicle || customer.typeVehicle,
      contract: contract || customer.contract,
      ownerCard: ownerCard || customer.ownerCard,
      identification: identification || customer.identification,
      name: customerName || customer.name,
      priceMonthly: priceMonthly || customer.priceMonthly,
    }

    editCustomerId(data);
    alert("¡Cliente editado exitosamente!");
    navigate("/clientes");
  };

  return (
    <>
      <Navbarnav />
      <h1 className="h1">Editar Cliente</h1>

      <form id="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ingresa el nombre del cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Placa</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Ingresa la placa del cliente"
              value={customerPlate}
              onChange={(e) => setCustomerPlate(e.target.value.toUpperCase())}
            />
          </div>

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

          <div className="form-group full-width">
            <label className="form-label">Tarjeta de propiedad</label>
            <input
              type="text"
              className="form-input"
              placeholder="Número de tarjeta de propiedad"
              value={ownerCard}
              onChange={(e) => setOwnerCard(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Identificación</label>
            <input
              type="text"
              className="form-input"
              placeholder="Número de identificación del cliente"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Precio contrato</label>
            <input
              type="text"
              className="form-input"
              placeholder="Precio del contrato"
              value={priceMonthly}
              onChange={(e) => setPriceMonthly(e.target.value)}
            />
          </div>
        </div>

        <button onClick={editCustomer} type="submit" className="form-button">
          Enviar
        </button>
      </form>
    </>
  );
}

export default EditCustomer;
