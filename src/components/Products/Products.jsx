import "./products.css";
import Navbarnav from "../Nav/Navbarnav";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { parkingContext } from "../../context/context";

function Products() {
  const [productName, setProductName] = useState("");
  const [priceProduct, setPriceProduct] = useState("");

  const { products, addProduct } = useContext(parkingContext);

  const productAdded = async (evt) => {
    evt.preventDefault();

    if (productName === "" || priceProduct === "") {
      alert("Completa todos los campos");
      return;
    }

    let data = {
      idproduct: products.length + 1,
      code: 400 + products.length,
      name: productName,
      price: priceProduct,
    };

    addProduct(data);
    document.getElementById("formProduct").reset();
  };

  return (
    <>
      <Navbarnav />
      <div className="containerProducts">
        <h1 className="tittleProducts">Agregar producto</h1>

        <form id="formProduct">
          <label htmlFor="nombre">Nombre producto</label>
          <input
            autoFocus
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            placeholder="Nombre del producto"
            name="nombre"
            type="text"
          />
          <label htmlFor="precio">Precio</label>
          <input
            onChange={(e) => {
              setPriceProduct(e.target.value);
            }}
            placeholder="Precio del producto"
            name="precio"
            type="number"
          />
          <Button onClick={productAdded} variant="outline-warning">
            Agregar
          </Button>
        </form>

        <div className="table-container">
          {products.length === 0 ? (
            <>
              <h3>¡No hay productos registrados!</h3>
            </>
          ) : (
            <div>
              <table className="custom-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Código</th>
                    <th className="table-header">Nombre</th>
                    <th className="table-header">Precio</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {products.map((item) => (
                    <tr className="table-row" key={item.name}>
                      <td className="table-cell">{item.idproduct}</td>
                      <td className="table-cell">{item.code}</td>
                      <td className="table-cell">{item.name}</td>
                      <td className="table-cell">${item.price}</td>
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

export default Products;
