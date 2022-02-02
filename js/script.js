let saldo = document.getElementById('saldo');
let ingreso = document.getElementById('ingreso');
let egreso = document.getElementById('egreso');



let select = document.getElementById('select');
let cantidad = document.getElementById('valor');
let descripcion = document.getElementById('descripcion')

let total = 0;
let total_ingreso = 0;
let total_egreso = 0;

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

const ingresoEgreso = () => {
    if (select.value == 'ingreso'){
        total = total + Number(cantidad.value);
        total_ingreso = total_ingreso + Number(cantidad.value);
        ingreso.innerHTML = `Ingresos Q ${total_ingreso}`;

    }else if (select.value == 'egreso'){
        total = total - Number(cantidad.value);
        total_egreso = total_egreso + Number(cantidad.value);
        egreso.innerHTML = `Egresos Q ${total_egreso}`;
    }
    saldo.innerHTML = `Saldo <br>Q ${total}`;
}