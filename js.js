window.addEventListener('load', () => {
  fetch('https://dog.ceo/api/breeds/list')
    .then((response) => response.json())
    .then((data) => {
      mostrarTodasLasRazasySubrazas(data);
    })
    .catch((err) => console.log(err));
});

fetch('https://dog.ceo/api/breeds/image/random')
  .then((respuesta) => respuesta.json())
  .then((data) => {
    mostrarImagenAleatoria(data);
  })
  .catch((err) => console.log(err));

const mostrarImagenAleatoria = (data) => {
  let div = document.createElement('div');
  let img = document.createElement('img');
  img.setAttribute('src', data.message);
  div.appendChild(img);
  document.getElementById('imagenAleatoria').appendChild(div);
};
const MostrarImagenesdeUnaRaza = () => {
  document.getElementById('selectRaza').addEventListener('change', () => {
    let url = 'https://dog.ceo/api/breed/' + document.getElementById('selectRaza').value + '/images';
    fetch(url)
      .then((respuesa) => respuesa.json())
      .then((data) => {
        pintarImagenesPorRaza(data);
      });
  });
};

const pintarImagenesPorRaza = (data) => {
  document.getElementById('imagenes') ? document.getElementById('imagenes').remove() : null;
  let div = document.createElement('div');
  div.id = 'imagenes';
  [...data.message].forEach((element) => {
    let img = document.createElement('img');
    img.setAttribute('src', element);
    div.appendChild(img);
  });
  document.getElementById('todasLasImagenesDeUnaRaza').appendChild(div);
};

const mostrarTodasLasRazasySubrazas = (data) => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then((retorno) => retorno.json())
    .then((data1) => {
      mostrarTodo(data, data1);
    });
};

const mostrarTodo = (data, data1) => {
  // data = solo raza, data1 = con subraza
  let div = document.createElement('div');
  for (let i = 0; i < data.message.length; i++) {
    let h4 = document.createElement('h4');
    let div2 = document.createElement('div');
    h4.innerHTML = data.message[i];
    div2.appendChild(h4);
    if (data1.message[data.message[i]].length > 0) {
      [...data1.message[data.message[i]]].forEach((element) => {
        let p = document.createElement('p');
        p.innerHTML = element;
        div2.appendChild(p);
      });
    }
    div.appendChild(div2);
  }
  [...data.message].forEach((element) => {
    let opcion = document.createElement('option');
    opcion.appendChild(document.createTextNode(element));
    document.getElementById('selectRaza').appendChild(opcion);
  });
  document.getElementById('Razas').appendChild(div);
  MostrarImagenesdeUnaRaza();
};
