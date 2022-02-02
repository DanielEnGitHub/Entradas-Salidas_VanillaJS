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

// RESUMEN DE REGISTROS
const contenido_ingresos = document.getElementById('contenido_ingresos');
const contenido_egresos = document.getElementById('contenido_egresos');

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

        contenido_ingresos.innerHTML = funcionIngresos();

    }else if (select.value == 'egreso'){
        egreso_array.push( new Egreso(descripcion.value, Number(cantidad.value)) );
        funcEgresos();
        total = funcIngresos() - funcEgresos();
        egreso.innerHTML = `Egresos ${formatoMoneda(funcEgresos())}`;

        contenido_egresos.innerHTML = funcionEgresos();
        
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

// FUNCION PARA RECCORRER ARRAY DE INGRESOS
const funcionIngresos = () =>{
    let ingresosHTML = '';
    for (const x of ingreso_array) {
        ingresosHTML += `<strong>${x.id} ${x._descripcion}</strong> <span class='ingresos_color'>${formatoMoneda(x._valor)} 
        <a onclick="eliminarIngreso(${x.id})"> <button class='delete'><ion-icon name="trash"></ion-icon></button> </a></span><br>`;
    }
    return ingresosHTML;    
}

// FUNCION PARA RECCORRER ARRAY DE EGRESOS
const funcionEgresos = () =>{
    let egresosHTML = '';
    for (const x of egreso_array) {
        egresosHTML += `<strong>${x.id} ${x._descripcion}</strong> <span class='egresos_color'>${formatoMoneda(x._valor)} 
        <a onclick="eliminarEgreso(${x.id})"> <button class='delete'><ion-icon name="trash"></ion-icon></button> </a> </span> <br>`;
    }
    return egresosHTML;
    
}

// Eliminar un ingreso
const eliminarIngreso = (id_rec) => {
    let eliminar = ingreso_array.findIndex( ingreso => ingreso.id === id_rec);
    ingreso_array.splice(eliminar, 1);
    contenido_ingresos.innerHTML = funcionIngresos();

    funcIngresos();
    ingreso.innerHTML = `Ingresos ${formatoMoneda(funcIngresos())}`;

    funcEgresos();
    egreso.innerHTML = `Egresos ${formatoMoneda(funcEgresos())}`;

    total = funcIngresos() - funcEgresos();
    saldo.innerHTML = `Saldo <br> ${formatoMoneda(total)}`;
}

// Eliminar un egreso
const eliminarEgreso = (id_rec) => {
    let eliminar = egreso_array.findIndex( ingreso => ingreso.id === id_rec);
    egreso_array.splice(eliminar, 1);
    contenido_egresos.innerHTML = funcionEgresos();

    funcIngresos();
    ingreso.innerHTML = `Ingresos ${formatoMoneda(funcIngresos())}`;

    funcEgresos();
    egreso.innerHTML = `Egresos ${formatoMoneda(funcEgresos())}`;

    total = funcIngresos() - funcEgresos();
    saldo.innerHTML = `Saldo <br> ${formatoMoneda(total)}`;
}