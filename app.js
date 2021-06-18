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

let heroes = JSON.parse(localStorage.getItem("heroes")) || [];
let limite = 7;

let alias = document.querySelector("#aliasText");
let nombre = document.querySelector("#nombreText");
let poder = document.querySelector("#poderText");
let equipo = document.querySelector("#equipoText");
let imagen = document.querySelector("#imagenText");

//Creo la clase para crear las instancias de heroe
class Personaje {
  constructor(alias, nombre, poder, equipo, imagen) {
    this.alias = alias;
    this.nombre = nombre;
    this.poder = poder;
    this.equipo = equipo;
    this.imagen = imagen;
  }
}

let cuerpoTabla = document.querySelector("#tusHeroes") || "";

//Agregar Heroe
function agregarHeroe() {
  if (
    !alias.value ||
    !nombre.value ||
    !poder.value ||
    !equipo.value ||
    !imagen.value
  )
  {if (!imagen.value) {
    imagen.value =
      "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";
  }
    alert("NO HA LLENADO EL REGISTRO,INTENTELO DE NUEVO");
    alias.focus();
  } else {
    let verificar = verificarH(alias.value);
    if (verificar) {
      alert("El heroe ya fue registrado!!, agregue uno nuevo");
    } else {
      if (limite > 0) {
        heroes.push(
          new Personaje(
            alias.value.toUpperCase(),
            nombre.value.toUpperCase(),
            poder.value.toUpperCase(),
            equipo.value.toUpperCase(),
            imagen.value.toUpperCase()
          )
        );
        localStorage.setItem("heroes", JSON.stringify(heroes));
        limite -= 1;

        alert("Se ha registrado correctamente su Heroe!");
        alert('Haga click en la seccion "TusHeroes" para poder verlo!');
      } else {
        alert("Ha superado el limite para poder ingresar heroes");
      }
      filtrarH();
    }
  }
}

function verificarH(alias) {
  let verificar = heroes.find(function (heroe) {
    return heroe.alias.toUpperCase() === alias.toUpperCase();
  });
  if (verificar) {
    return true;
  } else {
    return false;
  }
}

function filtrarH() {
  document.querySelector("#aliasText").value = "";
  document.querySelector("#aliasText").focus();
  document.querySelector("#nombreText").value = "";
  document.querySelector("#poderText").value = "";
  document.querySelector("#equipoText").value = "";
  document.querySelector("#imagenText").value = "";

  heroes = JSON.parse(localStorage.getItem("heroes"));
  tablaH(heroes);
}

//-------------------------------------------------------------------------------
//tabla

function tablaH(array) {
  cuerpoTabla.innerHTML = " ";
  heroes = JSON.parse(localStorage.getItem("heroes")) || [];
  array.forEach(function (elemento,index) {
    let colum = document.createElement("tr");
    colum.classList = "text-center";

    let info = `
    <td>${elemento.alias}</td>
    <td>${elemento.nombre}</td>
    <td>${elemento.poder}</td>
    <td>${elemento.equipo}</td>
    <td>
    <button class="btn btn-warning" onclick="verHeroe(${index})">Ver</button>
    <button class="btn btn-primary" onclick="irModif(${index})">Modif</button>
    <button class="btn btn-danger" onclick="borrarHeroe(${index})">X</button>
    </td>
    `;
    colum.innerHTML = info;

    cuerpoTabla.appendChild(colum);
  });
}

function verHeroe(id){
  console.log(id)

  document.querySelector('#title_modal').innerText=heroes[id].alias
  document.querySelector('.card-title').innerText=heroes[id].nombre
  document.querySelector('#imagen_heroe').src=heroes[id].imagen 
  document.querySelector('#text_poder').innerText=heroes[id].poder
  document.querySelector('#text_equipo').innerText=heroes[id].equipo
  $('#heroeModal').modal('show')

}

function borrarHeroe(id){
  heroe = heroes[id];

  let validar = confirm(`Está seguro que quiere borrar a ${heroe.alias}`);

  if (validar) {
    heroes.splice(id, 1);
    localStorage.setItem("heroes", JSON.stringify(heroes));

    alert(`Se borró a ${heroe.alias}`);
    tablaH(heroes);
  }

}

function irModif(id){
  heroe=heroes[id]

  document.querySelector("#modifTitle").innerText = heroe.alias;
  document.querySelector("#nombreModif").value = heroe.nombre;
  document.querySelector("#poderModif").value = heroe.poder;
  document.querySelector("#equipoModif").value = heroe.equipo;
  document.querySelector("#imagenModif").value = heroe.imagen;

  $('#modifModal').modal('show')
  console.log(id)

}

function handleChange(e) {
  // console.log(e.target.value);

  heroe = {
    ...heroe,
    [e.target.name]: e.target.value,
  };

  // console.log(heroe);
}

//funcion para actualizar heroe
function updateHeroe(e) {
  e.preventDefault(); //para que no se refresque la pantalla con el submit

  //Obtener posicion del heroe en el arreglo
  let index = heroes.findIndex(function (item) {
    return item.alias === heroe.alias;
  });

  //modificar solamente el heroe
  heroes.splice(index, 1, heroe);

  localStorage.setItem("heroes", JSON.stringify(heroes));
  tablaH(heroes);

  //cerrar modal
  $("#modifModal").modal("hide");
}


if (cuerpoTabla) {
    tablaH(heroes);
  }
  