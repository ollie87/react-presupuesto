import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        guardarGasto(gasto);
        guardarCrearGasto(true);

        guardarNombre('');
        guardarCantidad(0);
    }
    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>
            { error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" />  : null}
            <label>Nombre Gasto</label>
            <input
                type="text"
                className="u-full-width"
                placeholder="Ej. Transporte"
                onChange={e => guardarNombre(e.target.value)}
                value={nombre}
            />
            <label>Cantidad Gasto</label>
            <input
                type="number"
                className="u-full-width"
                placeholder="Ej. 300"
                onChange={e => guardarCantidad(parseInt(e.target.value))}
                value={cantidad}
            />
            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;