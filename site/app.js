// função do menu hamburgue
let menu = {
  onOpacity: function () {
    document.getElementById("menu").style.opacity = 1;
  },

  offOpacity: function () {
    document.getElementById("menu").style.opacity = 0;
  },
};

//Class despesas recebendo parametros dos valores em campo
class Despesas {
  constructor(year, month, day, type, description, valor) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.type = type;
    this.description = description;
    this.valor = valor;
  }

  // função logica de validação de cadastro
  validarDados() {
    // função for in ele ira percorrer todos os this ( ja que esta dentro do objeto) e retornara na variavel (i) citada do escopo do for
    for (let i in this) {
      // for ira percorrer todos os valores de this(todas variaveis no construtor) verificar se existe algum this com valore de underfine null "vazio"
      if (this[i] == undefined || this[i] == null || this[i] == "") {
        // caso  existe retornara false
        return false;
      }
    }
    return true;
  }
}

// Class banco de dados
// essa class tem a finalidade de craiar um banco de dados via local Storage, com incrementar uma lista de despesas.

class BancoDeDados {
  constructor() {
    let id = localStorage.getItem("id"); // verificar se existe um valor no id no local Storage
    if (id === null) {
      // caso nao exista, iremos incrementar id = 0, para temos um controle de lista com as despesas
      localStorage.setItem("id", 0); // craindo uma key ID valor 0
    }
  }

  getProximoId() {
    //lovalStorge.getItem() serve para recuperar um valor no local storage
    let nextID = localStorage.getItem("id"); //recuperando valor do id e incremetando +1
    return parseInt(nextID) + 1; // convertendo para numero
  }

  // gravando despesas em localStorage convertendo para JSON, (tipo de um banco de dado do site)
  gravar(d) {
    //ferramenta desenvolvedor alt+ctrl+i aplication local Storage
    //localStorage.setItem("name key", JSON.stringify(d));
    // JSON.stringify(objeto para ser convertido em arquivo JSON)
    // JSON.parse(arquivo JSON a ser convertido em objeto)
    //localStroge,setItem() serve para setar um valor no localStorage

    let id = this.getProximoId(); //atribuindo return da função a uma variavel
    localStorage.setItem(id, JSON.stringify(d)); // estmos convertento um objeto para JSON para comunicar com local Storage.

    // setItem('name da key a ser citada' ,  'retorno do valor ')
    localStorage.setItem("id", id);
  }
}

let bancoDeDados = new BancoDeDados();

// função de armazenar valores das despesas
let cadastrarDespesas = {
  cadastrar: function () {
    let year = document.getElementById("year");
    let month = document.getElementById("month");
    let day = document.getElementById("day");
    let type = document.getElementById("type");
    let description = document.getElementById("description");
    let valor = document.getElementById("valor");

    // criando class despesas com parametros
    let despesas = new Despesas(
      year.value,
      month.value,
      day.value,
      type.value,
      description.value,
      valor.value
    );

    // recuperando valor do campo original no HTML
    year.value = "";
    month.value = "";
    day.value = "";
    type.value = "";
    description.value = "";
    valor.value = "";

    //Controle de validação de cadastro
    // Modal msg sucesso ou erro

    if (despesas.validarDados()) {
      // msg de sucesso na gravação
      bancoDeDados.gravar(despesas); // chamando a função gravar para podermos ter acesso ao objeto convertido a JSON no local Storage
      //função de ativar o modal
      $("#registro-Despesas").modal("show"); // usando JQuery modificar Bootstrap para #btn cadastrar
      //titulo
      document.getElementById("tituloModal").innerHTML = "Sucesso";
      document.getElementById("tituloModal").className =
        "modal-title fs-5 text-success";
      //texto body
      document.getElementById("textModal").innerHTML =
        "Despesa gravada com sucesso!";
      //botao
      document.getElementById("btnModal").innerHTML = "Proxima despesa";
      document.getElementById("btnModal").className = "btn btn-success ";
    } else {
      // msg de erro na gravação
      //função de ativar o modal
      $("#registro-Despesas").modal("show"); // usando JQuery modificar Bootstrap para #btn cadastrar
      //titulo
      document.getElementById("tituloModal").innerHTML = "Erro na Gravação";
      document.getElementById("tituloModal").className =
        "modal-title fs-5 text-danger";
      //texto body
      document.getElementById("textModal").innerHTML =
        " Verifica se todos os campos foram preenchido";
      //botao
      document.getElementById("btnModal").innerHTML = "Voltar";
      document.getElementById("btnModal").className = "btn btn-dark ";
    }
  },
};
