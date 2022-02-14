import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Elemento vació");
      return;
    }
    setTareas([...tareas, { id: shortid.generate(), tarea }]);

    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((tarea) => tarea.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.tarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Elemento vació");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id, tarea } : item
    );

    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.tarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <div className="d-grid gap-2">
              {modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">
                  Agregar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
