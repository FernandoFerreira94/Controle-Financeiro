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

  // função para recupear os dados do localStorage
  recuperarTodosRegistros() {
    // array despesas
    let listaDepesas = Array();
    // getItem recupera valores do localStorage
    let id = localStorage.getItem("id");
    //loop recupear dados despesas
    for (let i = 1; i <= id; i++) {
      // recuperando dados do localstorage
      let despesas = localStorage.getItem(i);
      // transformando arquivo JSON para OBJETO
      despesas = JSON.parse(despesas);

      // acrecetando valor de id
      // caso algum dados for excluido, o if-continue ira pular o dados excluido pois ele retornara como null
      if (despesas === null) {
        continue;
      }
      despesas.id = i;
      // incremetando dados da (despesas) no array listaDepesas
      listaDepesas.push(despesas);
    }
    return listaDepesas;
  }

  // função de pesquisar e filtrar os dados das despesas
  pesquisa(despesas) {
    // parametro (despesas) recupera recuperarDespesas() que retorna os valores digitado no campo html

    let despesasFiltradas = Array();
    // recuperando return da funcção recuperarTodosRegistro() que retorna um array dos dados
    despesasFiltradas = this.recuperarTodosRegistros();
    // iremos comparar e filtrar com despesasFiltradas que retorna os dados ja existente no localStorage com (d) recuperarTodosRegistros() retorna os dados digitado em campo.

    // year
    if (despesas.year != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.year == despesas.year
      );
    }

    // month
    if (despesas.month != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.month == despesas.month
      );
    }

    //day
    if (despesas.day != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.day == despesas.day
      );
    }

    //type
    if (despesas.type != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.type == despesas.type
      );
    }

    //description
    if (despesas.description != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.description == despesas.description
      );
    }

    //valor
    if (despesas.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesas.valor
      );
    }
    return despesasFiltradas;
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

    //Controle de validação de cadastro
    // Modal msg sucesso ou erro

    if (despesas.validarDados()) {
      // msg de sucesso na gravação
      bancoDeDados.gravar(despesas); // chamando a função gravar para podermos ter acesso ao objeto convertido a JSON no local

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

      // recuperando valor do campo original no HTML
      year.value = "";
      month.value = "";
      day.value = "";
      type.value = "";
      description.value = "";
      valor.value = "";
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

// função contruir lista de despesas dinamico
let carregaListaDepesas = () => {
  // array da lista de despesas
  let listaDepesas = Array();

  //atribuindo o valor do retorno da função ao array
  listaDepesas = bancoDeDados.recuperarTodosRegistros();

  // elemento tbody da pagina consulta.html
  let tbody = document.getElementById("tbody");

  // percorrer o array listaDepesas, listando cada dispesa de forma dinamica
  listaDepesas.forEach((d) => {
    //insertRow() acrecenta linhas na tabela
    //inserindo linha no tbody
    let row = tbody.insertRow();

    //unsertCell() acrecenta colunas na tabela
    // inserindo colunas no tbody
    row.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`; // data
    row.insertCell(1).innerHTML = `${d.type}`; // tipo
    row.insertCell(2).innerHTML = `${d.description}`; // descrição
    row.insertCell(3).innerHTML = `${d.valor}`; // valor
    row.insertCell(4).innerHTML = ""; // botao excluir

    // craindo button de excluir
    let btnExcluir = document.createElement("button");
    // estilizando o btn
    btnExcluir.className = "btn btn-outline-danger btn-sm";
    //incremetando (X)
    btnExcluir.innerHTML = "<i class='fas fa-times'></i>";
    btnExcluir.id = `id_despesas${d.id}`;
    // função de excluir despesa
    btnExcluir.onclick = () => {
      // excluindo despesas direto do localstorage
      localStorage.removeItem(d.id);
      //refresh da pagina, pois quando excluimos as tags ja criada no html nao desaparece, so depois do realod
      location.reload();
    };

    row.insertCell(4).append(btnExcluir); // botao excluir
  });
};

let pesquisaDespesas = () => {
  let year = document.getElementById("year");
  let month = document.getElementById("month");
  let day = document.getElementById("day");
  let type = document.getElementById("type");
  let description = document.getElementById("description");
  let valor = document.getElementById("valor");

  let despesas = new Despesas(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    valor.value
  );
  let despesasPesquisar = bancoDeDados.pesquisa(despesas);

  carregaListaDepesas();
  // elemento tbody da pagina consulta.html
  let tbody = document.getElementById("tbody");
  // limpando o campo do tbody para que os valores do filter fico isolado no tbody
  tbody.innerHTML = "";
  // percorrer o array listaDepesas, listando cada dispesa de forma dinamica
  despesasPesquisar.forEach((d) => {
    //insertRow() acrecenta linhas na tabela
    //inserindo linha no tbody
    let row = tbody.insertRow();

    //unsertCell() acrecenta colunas na tabela
    // inserindo colunas no tbody
    row.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`; // data
    row.insertCell(1).innerHTML = `${d.type}`; // tipo
    row.insertCell(2).innerHTML = `${d.description}`; // descrição
    row.insertCell(3).innerHTML = `${d.valor}`; // valor

    // craindo button de excluir
    let btnExcluir = document.createElement("button");
    // estilizando o btn
    btnExcluir.className = "btn btn-outline-danger btn-sm";
    //incremetando (X)
    btnExcluir.innerHTML = "<i class='fas fa-times'></i>";
    btnExcluir.id = `id_despesas${d.id}`;
    // função de excluir despesa
    btnExcluir.onclick = () => {
      // excluindo despesas direto do localstorage
      localStorage.removeItem(d.id);
      //refresh da pagina, pois quando excluimos as tags ja criada no html nao desaparece, so depois do realod
      location.reload();
    };

    row.insertCell(4).append(btnExcluir); // botao excluir
  });
};
