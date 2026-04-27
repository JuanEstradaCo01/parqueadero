import "./banks.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";

function Banks() {
  const [bankName, setBankName] = useState("");

  const { banks, addBank } = useContext(parkingContext);

  const bankAdded = async (evt) => {
    evt.preventDefault();

    if (bankName === "") {
      alert("Completa el campo del nombre del banco");
      return;
    }

    let data = {
      idBank: banks.length + 1,
      code: 300 + banks.length,
      name: bankName,
    };

    addBank(data);
    document.getElementById("formBank").reset();
  };

  return (
    <>
      <Navbarnav />
      <div className="containerBankCard">
        <h1 className="tittleBankCard">Agregar banco</h1>

      
          <form id="formBank">
            <label htmlFor="banco">Nombre</label>
            <input autoFocus
              onChange={(e) => {
                setBankName(e.target.value);
              }}
              placeholder="Nombre del banco"
              name="banco"
              type="text"
            />
            <Button onClick={bankAdded} variant="outline-warning">
              Agregar
            </Button>
          </form>
      </div>

      <div className="table-container">
        <h2 className="table-title">Bancos Registrados:</h2>

        {banks.length === 0 ? (
          <>
            <h3>¡No hay bancos registrados!</h3>
          </>
        ) : (
          <div>
            <table className="custom-table">
              <thead className="table-head">
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Código</th>
                  <th className="table-header">Nombre</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {banks.map((item) => (
                  <tr className="table-row" key={item.name}>
                    <td className="table-cell">{item.idBank}</td>
                    <td className="table-cell">{item.code}</td>
                    <td className="table-cell">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Banks;
