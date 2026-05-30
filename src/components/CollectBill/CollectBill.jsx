import "./collectBill.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";
import jsPDF from "jspdf";

//Componente que permite realizar la facturacion de un vehiculo, generando un pdf con los datos de la factura
function CollectBill() {
  const { vehicles, deleteVehicle, addBill } = useContext(parkingContext);

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
  const [payMethod, setPayMethod] = useState("efectivo");
  const [data, setData] = useState({});
  const [vehicle, setVehicle] = useState({});

  const [plate, setPlate] = useState("");

  //Funcion que captura toda la informacion del vehiculo a facturar.
  const capturingPlate = async (evt) => {
    evt.preventDefault();

    document.getElementById("formPlateCollectBill").reset();

    if (plate === "") {
      alert("Completa el campo de placa");
      return;
    } else {
      const vehicle = vehicles.find((item) => item.plate === plate);

      setVehicle(vehicle);

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

  //Funcion que genera la factura del vehiculo.
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
      plate,
    };

    const totalBill =
      finalBillData.total +
      billData.valorLavada +
      billData.valorPulida +
      billData.valorEncerada +
      billData.valorPolichada +
      billData.valorTratamientoColor;

    deleteVehicle(plate);
    addBill(finalBillData);
    generatePdf(totalBill);
  };

  //Funcion que genera un pdf con los datos de la factura, utilizando la libreria jsPDF
  function generatePdf(totalBill) {
    const date = new Date().toLocaleDateString();

    const pdf = new jsPDF({ unit: "mm", format: [80, 120] });
    const W = 80;
    const margin = 8;
    let y = 10;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("PARQUEADERO SANTA ROSA", W / 2, y, { align: "center" });

    y += 4;
    pdf.setLineDashPattern([1, 1], 0);
    pdf.line(margin, y, W - margin, y);

    y += 6;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(`Fecha:`, margin, y);
    pdf.text(`${date} ${new Date().toLocaleTimeString()}`, W - margin, y, {
      align: "right",
    });

    y += 5;
    pdf.text(`Placa:`, margin, y);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${plate}`, W - margin, y, { align: "right" });

    y += 4;
    pdf.setLineDashPattern([1, 1], 0);
    pdf.line(margin, y, W - margin, y);

    const items = [
      ["Valor Lavada:", `$${valorLavada}`],
      ["Valor Pulida:", `$${pulida ? valorPulida : 0}`],
      ["Valor Encerada:", `$${encerada ? valorEncerada : 0}`],
      ["Valor Polichada:", `$${polichada ? valorPolichada : 0}`],
      [
        "Valor Trat. Color:",
        `$${tratamientoColor ? valorTratamientoColor : 0}`,
      ],
      ["Horas:", `${data.hours}`],
      ["Valor hora:", `$${vehicle.hourlyValue}`],
      ["Metodo de pago:", `${payMethod}`],
    ];

    y += 5;
    pdf.setFont("helvetica", "normal");
    items.forEach(([label, value]) => {
      if (value !== "$0") {
        pdf.text(label, margin, y);
        pdf.text(value, W - margin, y, { align: "right" });
        y += 5;
      }
    });

    pdf.setLineDashPattern([1, 1], 0);
    pdf.line(margin, y, W - margin, y);

    y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.text("Total a Pagar:", margin, y);
    pdf.text(`$${totalBill}`, W - margin, y, { align: "right" });

    y += 6;
    pdf.setLineDashPattern([1, 1], 0);
    pdf.line(margin, y, W - margin, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.text("¡Gracias por su visita!", W / 2, y, { align: "center" });

    pdf.save(`Factura_${plate}.pdf`);
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
              setPlate(e.target.value.toUpperCase());
            }}
            placeholder="Placa del vehículo"
            name="placa"
            value={plate}
            required
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

            <div>
              <label>Metodo de pago</label>
              <div>
                <label>
                  <input
                    onChange={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    type="radio"
                    name="payMethod"
                    value="efectivo"
                  />{" "}
                  Efectivo
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    type="radio"
                    name="payMethod"
                    value="tarjeta"
                  />{" "}
                  Tarjeta
                </label>
                <label>
                  <input
                    onChange={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    type="radio"
                    name="payMethod"
                    value="transferencia"
                  />{" "}
                  Transferencia
                </label>
              </div>
            </div>

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
