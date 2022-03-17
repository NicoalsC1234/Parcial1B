const DATA =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
const burguer = document.getElementById("hamburguesas");
const tacos = document.getElementById("tacos");
const ensalada = document.getElementById("salads");
const postre = document.getElementById("desserts");
const bebidas = document.getElementById("drinks");
const tabla = document.getElementById("carta");
const total = document.getElementById("total");
const cuenta = document.getElementById("contador");
const mercado = document.getElementById("mercado");
const mercar = document.getElementById("mercar");
let nombres = [];
let carro = new Map();
let posiciones = [];
let numero = 0;
let datos;
fetch(DATA)
  .then((response) => response.json())
  .then((response) => {
    datos = response;
  });

ensalada.addEventListener("click", function (event) {
  event.preventDefault();
  cargarTabla("Salads");
});

burguer.addEventListener("click", function (event) {
  event.preventDefault();
  cargarTabla("Burguers");
});

postre.addEventListener("click", function (event) {
  event.preventDefault();
  cargarTabla("Desserts");
});

tacos.addEventListener("click", function (event) {
  event.preventDefault();
  cargarTabla("Tacos");
});

bebidas.addEventListener("click", function (event) {
  event.preventDefault();
  cargarTabla("Drinks and Sides");
});

mercado.addEventListener("click", function (event) {
  event.preventDefault();
  cargarProductos();
});

function cargarTabla(tipo) {
  datos.forEach((element) => {
    if (element.name == tipo) {
      let producto = element.products;
      console.log(producto);
      tabla.innerHTML = "";
      tabla.innerHTML = `<h5 style="text-align: center; margin-top: 30px" ><b>${tipo}</b></h5><hr>`;
      nombres = []
      posiciones = []
      let contador = 0
      producto.forEach((comida) => {
        tipo = tipo.toUpperCase();
        tabla.innerHTML += `
        <div class="col-md-3">
        <div class="card w-100" style="align-items: center;">
        <div>
          <img class="card-img-top w-100" src="${comida.image}" alt="Card image cap"></div>
          <div class="card-body">
            <h5 class="card-title">${comida.name}</h5>
            <p class="card-text" style="font-size: 12">${comida.description}</p>
            <h3 class="card-title">${comida.price}</h3>
            <button data-id="${contador}" class="btn btn-warning style="align_items: center">Add to cart</button>
          </div>
          </div>
        </div>`;
        nombres.push(comida)
        posiciones.push(comida.name)
        contador ++
      });
    }
  });
}

tabla.addEventListener('click', e =>{
  console.log(e.target)
  agregar(e)
})


function agregar(e) {
  let hola = e.target.parentElement.querySelector('h5').textContent
  let chao = posiciones.indexOf(hola)
  let comida = nombres[chao]

  numero ++
  cuenta.innerHTML = numero + " Items"
  
  if(carro.get(comida) == undefined){
      carro.set(comida,1)
  }
  else{
    carro.set(comida, carro.get(comida)+1)
  }
  console.log(carro)
}

function cargarProductos(){
  let contador = 0
  let total = 0
  tabla.innerHTML = "";
  mercar.innerHTML = "";
  carro.forEach((i,element) => {
    mercar.innerHTML += `
        <td>${contador}</td>
        <td>${i}</td>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td>${Math.round(element.price * i*100)/100}</td>
        <td>"botones :("</td>`
    contador ++
  });
}

function pedidoConsola(){
  let obj = {item: 0, quantity: 0, description: "", unitPrice: 0}
  let x=1
  carrito.forEach((values,keys)=>{
    obj.item = x
    obj.quantity = values
    obj.description = keys.name
    obj.unitPrice = keys.price
    x++
    console.log(obj) 
  })
}