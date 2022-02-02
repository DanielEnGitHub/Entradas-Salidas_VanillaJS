// ELEMENTOS DE SECCION RESUMEN
let saldo = document.getElementById('saldo');
let ingreso = document.getElementById('ingreso');
let egreso = document.getElementById('egreso');

// INPUTS PARA EL FORMULARIO (REGISTRO)
let select = document.getElementById('select');
let cantidad = document.getElementById('valor');
let descripcion = document.getElementById('descripcion')

// VARIABLES
let total = 0;

const ingreso_array = [];
const egreso_array = [];

// FUNCION PARA VALIDAR DATOS
const calcular = () => {
    if(cantidad.value == '' && descripcion.value == ''){
        cantidad.style.border = '1px solid red';
        descripcion.style.border = '1px solid red';
        cantidad.focus();

    }else if (descripcion.value == '') {
        descripcion.style.border = '1px solid red';
        descripcion.focus();
        cantidad.style.border = '';

    }else if(cantidad.value == ''){
        cantidad.style.border = '1px solid red';
        descripcion.style.border = '';
        cantidad.focus();

    }else{
        cantidad.style.border = '';
        descripcion.style.border = '';
        ingresoEgreso();
    }
}

// FUNCION PARA MODIFICAR SECCION DE RESUMEN
const ingresoEgreso = () => {
    if (select.value == 'ingreso'){
        ingreso_array.push( new Ingreso(descripcion.value, Number(cantidad.value)) );
        funcIngresos();

        total = funcIngresos() - funcEgresos();
        ingreso.innerHTML = `Ingresos ${formatoMoneda(funcIngresos())}`;

    }else if (select.value == 'egreso'){
        egreso_array.push( new Egreso(descripcion.value, Number(cantidad.value)) );
        funcEgresos();
        total = funcIngresos() - funcEgresos();
        egreso.innerHTML = `Egresos ${formatoMoneda(funcEgresos())}`;
    }
    saldo.innerHTML = `Saldo <br> ${formatoMoneda(total)}`;
}

// Formato de moneda
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-GT',{style:'currency', currency:'QTZ', minimumFractionDigits:2});
}


// Ingresos
const funcIngresos = () =>{
    let total_ingreso = 0;
    for(let x of ingreso_array){
        console.log(x);
        total_ingreso += x._valor;
    }

    return total_ingreso;
}
// Egresos
const funcEgresos = () =>{
    let total_egreso = 0;

    for(let x of egreso_array){
        total_egreso += x._valor;
    }

    return total_egreso;
}
