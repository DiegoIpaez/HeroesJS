/*
Crear una web de superhéroes donde se carguen los datos de un héroe y se pueda ver en una tabla los héroes cargados.
Los requerimientos son los siguientes:

- La web debe tener las siguientes páginas:
 - **Home** (principal) con un mensaje de bienvenida
 - **Cargar** con un formulario donde se agreguen los siguientes datos: Alias, nombre, poder, equipo, imagen(url de la imagen)
 - **Tabla** donde muestre una tabla dinámica con los datos de los héroes (la imagen no es necesario que aparezca)
- Se debe poder navegar desde un navbar que debe estar presente en todas las páginas.
- Se puede crear un archivo js para cada página
- Los datos deben guardarse en localStorage para poder extraerlos desde allí de ser necesario. 
*/


let heroes=JSON.parse(localStorage.getItem('heroes')) || []
let limite=7

class Personaje{
    constructor(alias, nombre, poder, equipo, imagen){
        this.alias=alias
        this.nombre=nombre
        this.poder=poder
        this.equipo=equipo
        this.imagen=imagen
    }
}

//Agregar Heroe
function agregarHeroe(){
    let alias=document.querySelector('#aliasText')
    let nombre=document.querySelector('#nombreText')
    let poder=document.querySelector('#poderText')
    let equipo=document.querySelector('#equipoText')
    let imagen=document.querySelector('#imagenText')

    if(!alias.value || !nombre.value || !poder.value|| !equipo.value|| !imagen.value ){
        alert('NO HA LLENADO EL REGISTRO,INTENTELO DE NUEVO')
        alias.focus()
    }else{
        let verificar=verificarH(alias.value)
        if(verificar){
            alert('El heroe ya fue registrado!!, agregue uno nuevo')
        }else{
            if(limite>0){
                heroes.push(new Personaje(alias.value.toUpperCase(),nombre.value.toUpperCase(),poder.value.toUpperCase(),equipo.value.toUpperCase(),imagen.value.toUpperCase()))
                localStorage.setItem('heroes',JSON.stringify(heroes))
                limite-=1
               
                alert('Se ha registrado correctamente su Heroe!')
                alert('Haga click en la seccion "TusHeroes" para poder verlo!')
            }else{
                alert('Ha superado el limite para poder ingresar heroes')
            }
         filtrarH()
        } 
    }

}

function verificarH(alias){
    let verificar=heroes.find(function(heroe){
        return heroe.alias.toUpperCase()===alias.toUpperCase()
    })
    if(verificar){
        return true
    }else{
        return false
    }
}


function filtrarH(){
    document.querySelector('#aliasText').value=""
    document.querySelector('#aliasText').focus()
    document.querySelector('#nombreText').value=""
    document.querySelector('#poderText').value=""
    document.querySelector('#equipoText').value=""
    document.querySelector('#imagenText').value=""

    heroes=JSON.parse(localStorage.getItem('heroes'))
    tablaH(heroes)
}

//-------------------------------------------------------------------------------
//tabla

function tablaH(array){
    document.querySelector("#tusHeroes").innerHTML=" "
    array.forEach(function(elemento){
    let colum=document.createElement('tr')
    colum.classList='text-center'

    let info=`
    <td>${elemento.alias}</td>
    <td>${elemento.nombre}</td>
    <td>${elemento.poder}</td>
    <td>${elemento.equipo}</td>
    <td>${elemento.imagen}</td>
    `
    colum.innerHTML=info

    let base=document.querySelector('#tusHeroes')
    base.appendChild(colum)
        
    });
}

tablaH(heroes)