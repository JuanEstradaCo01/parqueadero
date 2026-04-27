import "./collectBill.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";
import jsPDF from "jspdf";

function CollectBill() {
  const { vehicles, deleteVehicle } = useContext(parkingContext);

  const [existPlate, setExistPlate] = useState(false);
  const [lavada, setLavada] = useState(false);
  const [valorLavada, setValorLavada] = useState(0);
  const [pulida, setPulida] = useState(false);
  const [valorPulida, setValorPulida] = useState(0);
  const [encerada, setEncerada] = useState(false);
  const [valorEncerada, setValorEncerada] = useState(0);
  const [polichada, setPolichada] = useState(false);
  const [valorPolichada, setValorPolichada] = useState(0);
  const [tratamientoColor, setTratamientoColor] = useState(false);
  const [valorTratamientoColor, setValorTratamientoColor] = useState(0);
  const [data, setData] = useState({});

  const [plate, setPlate] = useState("");

  const capturingPlate = async (evt) => {
    evt.preventDefault();

    document.getElementById("formPlateCollectBill").reset();

    if (plate === "") {
      alert("Completa el campo de placa");
      return;
    } else {
      const vehicle = vehicles.find((item) => item.plate === plate);

      if (vehicle) {
        const dateIn = vehicle.time;
        const dateOut = new Date().getTime();
        const timeDiff = Math.abs(dateOut - dateIn);
        const hours = Math.ceil(timeDiff / (1000 * 60 * 60));
        const total = hours * vehicle.hourlyValue;

        const data = {
          dateIn: vehicle.date,
          dateOut,
          hourlyValue: vehicle.hourlyValue,
          hours,
          total,
        };

        setData(data);
        setExistPlate(true);
      } else {
        alert("El vehículo no se encuentra registrado");
      }
    }
  };

  const bill = async (evt) => {
    evt.preventDefault();

    document.getElementById("formBill").reset();

    const billData = {
      valorLavada: valorLavada || 0,
      valorPulida: pulida === true ? valorPulida : 0,
      valorEncerada: encerada === true ? valorEncerada : 0,
      valorPolichada: polichada === true ? valorPolichada : 0,
      valorTratamientoColor:
        tratamientoColor === true ? valorTratamientoColor : 0,
    };

    const finalBillData = {
      ...data,
      ...billData,
    };

    const totalBill = finalBillData.total + billData.valorLavada + billData.valorPulida + billData.valorEncerada + billData.valorPolichada + billData.valorTratamientoColor;

    deleteVehicle(plate);
    generatePdf(totalBill);
  };

  function generatePdf(totalBill) {
    const pdf = new jsPDF();

    const date = new Date().toLocaleDateString();

    pdf.setFont("helvetica", "bold");
    pdf.text("Parqueadero Santa Rosa", 70, 10);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Fecha: ${date}`, 10, 20);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Placa: ${plate}`, 10, 30);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Valor Lavada: $${valorLavada}`, 10, 40);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Valor Pulida: $${pulida === true ? valorPulida : 0}`, 10, 50);

    pdf.setFont("helvetica", "bold");
    pdf.text(
      `Valor Encerada: $${encerada === true ? valorEncerada : 0}`,
      10,
      60,
    );

    pdf.setFont("helvetica", "bold");
    pdf.text(
      `Valor Polichada: $${polichada === true ? valorPolichada : 0}`,
      10,
      70,
    );

    pdf.setFont("helvetica", "bold");
    pdf.text(
      `Valor Tratamiento de Color: $${tratamientoColor === true ? valorTratamientoColor : 0}`,
      10,
      80,
    );

    pdf.setFont("helvetica", "bold");
    pdf.text(`Total a Pagar: $${totalBill}`, 10, 90);

    pdf.setFont("helvetica", "bold");
    pdf.save("factura.pdf");
  }

  return (
    <>
      <Navbarnav />
      <div className="containerCollectBill">
        <h1 className="tittleCollectBill">Facturacion</h1>

        <form id="formPlateCollectBill">
          <label htmlFor="placa">Placa</label>
          <input
            onChange={(e) => {
              setPlate(e.target.value);
            }}
            placeholder="Placa del vehículo"
            name="placa"
            type="text"
          />
          <Button onClick={capturingPlate} variant="outline-warning">
            Enviar
          </Button>
        </form>
      </div>

      {existPlate !== true ? (
        <></>
      ) : (
        <div className="form-container">
          <h2>Servicios de Vehículo</h2>

          <form id="formBill">
            <div>
              <label>Lavada</label>
              <div>
                <label>
                  <input type="radio" name="lavada" value="sencilla" /> Sencilla
                </label>
                <label>
                  <input type="radio" name="lavada" value="profunda" /> Profunda
                </label>
              </div>
            </div>

            <div>
              <label>Valor Lavada</label>
              <input
                onChange={(e) => {
                  setValorLavada(Number(e.target.value));
                }}
                type="number"
                name="valorLavada"
              />
            </div>

            <div>
              <label>Pulida</label>
              <div>
                <label>
                  <input
                    onChange={(e) => {
                      setPulida(true);
                    }}
                    type="radio"
                    name="pulida"
                    value="si"
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setPulida(false);
                    }}
                    type="radio"
                    name="pulida"
                    value="no"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {pulida === true ? (
              <div>
                <label>Valor Pulida</label>
                <input
                  onChange={(e) => {
                    setValorPulida(Number(e.target.value));
                  }}
                  type="number"
                  name="valorPulida"
                />
              </div>
            ) : (
              <></>
            )}

            <div>
              <label>Encerada</label>
              <div>
                <label>
                  <input
                    onChange={(e) => {
                      setEncerada(true);
                    }}
                    type="radio"
                    name="encerada"
                    value="si"
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setEncerada(false);
                    }}
                    type="radio"
                    name="encerada"
                    value="no"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {encerada === true ? (
              <div>
                <label>Valor Encerada</label>
                <input
                  onChange={(e) => {
                    setValorEncerada(Number(e.target.value));
                  }}
                  type="number"
                  name="valorEncerada"
                />
              </div>
            ) : (
              <></>
            )}

            <div>
              <label>Polichada</label>
              <div>
                <label>
                  <input
                    onChange={(e) => {
                      setPolichada(true);
                    }}
                    type="radio"
                    name="polichada"
                    value="si"
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setPolichada(false);
                    }}
                    type="radio"
                    name="polichada"
                    value="no"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {polichada === true ? (
              <div>
                <label>Valor Polichada</label>
                <input
                  onChange={(e) => {
                    setValorPolichada(Number(e.target.value));
                  }}
                  type="number"
                  name="valorPolichada"
                />
              </div>
            ) : (
              <></>
            )}

            <div>
              <label>Tratamiento de color</label>
              <div>
                <label>
                  <input
                    onChange={(e) => {
                      setTratamientoColor(true);
                    }}
                    type="radio"
                    name="tratamientoColor"
                    value="si"
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setTratamientoColor(false);
                    }}
                    type="radio"
                    name="tratamientoColor"
                    value="no"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {tratamientoColor === true ? (
              <div>
                <label>Valor Tratamiento de Color</label>
                <input
                  onChange={(e) => {
                    setValorTratamientoColor(Number(e.target.value));
                  }}
                  type="number"
                  name="valorTratamientoColor"
                />
              </div>
            ) : (
              <></>
            )}

            <button onClick={bill} type="submit">
              Guardar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CollectBill;
