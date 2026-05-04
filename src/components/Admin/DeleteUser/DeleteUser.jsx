import "./deleteUser.css";
import Navbarnav from "../../Nav/Navbarnav";
import { useState, useContext } from "react";
import { parkingContext } from "../../..//context/context";

function DeleteUser() {
  const { users, deleteUser } = useContext(parkingContext);

  function deleteUserId(id) {
    deleteUser(id);
    alert("¡Usuario eliminado exitosamente!")
  }

  return (
    <>
      <Navbarnav />
      {users.length <= 1 ? (
        <>
          <h1 className="h1">Eliminar usuarios</h1>
          <h3 className="h3">¡No hay usuarios en el sistema!</h3>
        </>
      ) : (
        <>
          <h3 className="h3">Usuarios del sistema</h3>
          <div>
            <table className="custom-table">
              <thead className="table-head">
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Nombre</th>
                  <th className="table-header">Identificación</th>
                  <th className="table-header">Teléfono</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Accion</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {users.map((item) => (
                  <tr className="table-row" key={item.idCajero}>
                    <td className="table-cell">{item.idCajero}</td>
                    <td className="table-cell">{item.username}</td>
                    <td className="table-cell">{item.identificacion}</td>
                    <td className="table-cell">{item.phone}</td>
                    <td className="table-cell">{item.email}</td>
                    <td>
                      <button onClick={() => deleteUserId(item.idCajero)} className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default DeleteUser;
