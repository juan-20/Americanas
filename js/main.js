const usuarios = [];


function salvar(){
  const nome =     document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email =    document.getElementById("email").value;
  const cidade =   document.getElementById("cidade").value;
  
  let id = usuarios.length;

  const usuario = {id: id++,nome, endereco, telefone, email, cidade};
  usuarios.push(usuario);
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limpar();

}


function apagarUsuario(id){
  Swal.fire({
    title: 'Confirmar a exclusão do Usuário?',
    
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {
      let usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      if(usuarioIndex >= 0){
        usuarios.splice(usuarioIndex,1);
        if(usuarios.length > 0){
          listarUsuarios();
        }else{
          row = document.getElementById("tbody");
          row.innerHTML = "";
        }
      }
      Swal.fire(
        'Usuário excluído!',
        '',
        'success'
      )
    }
  });
}



function limpar(){
  // Limpar de forma manual

  //  document.getElementById("nome") = "";
  //  document.getElementById("endereco") = "";
  //  document.getElementById("telefone") = "";
  //  document.getElementById("email") = "";
  //  document.getElementById("cidade") = "";

  let inputs = document.getElementsByTagName('input');
  nao = document.getElementById('atu');
  n = document.getElementById('Salvar');
  for(let i =0; i<inputs.length; i++){
    if (inputs === n || inputs === nao ){

    }else{

    inputs[i].value = "";

    }
  }
}

 function editarUsuario(id){
  for(let i =0; i<usuarios.length; i++){
    if (usuarios[i].id == id){
      document.getElementById("id").value = usuarios[i].id;
      document.getElementById("nome").value = usuarios[i].nome;
      document.getElementById("endereco").value =  usuarios[i].endereco;
      document.getElementById("telefone").value =usuarios[i].telefone;
      document.getElementById("email").value =usuarios[i].email;
      document.getElementById("cidade").value =usuarios[i].cidade;
    }
  }


  // Swal.fire({
  //   title: 'Gostaria de editar?',
  //   text: "Tem certeza?",
  //   icon: 'info',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Editar'
  // }).then((result) => {
  //   let linha = "";
  //   usuarios.forEach(usuario =>{
  //     row = document.getElementById("form");
  //     linha += "<input>"+
  //              "<input id='nome'>"+usuario.nome+"</input>"
  //              "<input id='endereco'>"+usuario.endereco+"</input>"
  //              "<input id='teefone'>"+usuario.telefone+"</input>"
  //              "<input id='email'>"+usuario.email+"</input>"
  //              "<input id='cidade'>"+usuario.cidade+"</input>"
  //   })

  //   if (result.value) {
  //     Swal.fire(
  //       'Os valores vão aparecer no inpu',
  //     )
  //   }
  // });
}

function cadusuario(){
  const nome =     document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email =    document.getElementById("email").value;
  const cidade =   document.getElementById("cidade").value;
  const senha =   document.getElementById("senha").value;
  
  
  const usuario = {id: Date.now(),nome, endereco, telefone, email, cidade, senha};
  // usuarios.push(usuario);
  // DADOS EM CACHE
  window.localStorage.setItem("usuarios", JSON.stringify([]));
  let usuariogravado = JSON.parse( window.localStorage.getItem('usuarios'));
  
  usuariogravado.push(usuario);

  window.localStorage.setItem("usuarios", JSON.stringify(usuariogravado));


  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  
  window.location.href = 'index.html';

}


function logar(){
  const email =    document.getElementById("email").value;
  const senha =   document.getElementById("senha").value;

  debugger

  let usuariosgravados = JSON.parse(window.localStorage.getItem("usuarios"));
    // correcao
  let usuarioIndex = usuariosgravados.findIndex(usuario => usuario.email === email);
  console.log(usuariosgravados);

  if (usuarioIndex === -1){
    Swal.fire({
      icon: 'warning',
      title: 'Usuário incorreto!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{
        if(usuariosgravados[usuarioIndex].senha !== senha){
        Swal.fire({
    
        icon: 'success',
        title: 'Senha incorreta',
        showConfirmButton: false,
        timer: 1500
       });
       }else{
              window.location.href = 'splashprodutos.html';
            }
  }

  
}

function atuser(){
  debugger
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;

  usuarios [id] ={id, nome, endereco, telefone, email, cidade};

  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limpar();

}


function listarUsuarios(){
  let linha = "";
  usuarios.forEach(usuario => {
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tdendereco'>"+usuario.endereco+"</td>"+
              "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
              "<td id='tdemail'>"+usuario.email+"</td>"+
              "<td id='tdcidade'>"+usuario.cidade+"</td>"+
              "<td id='tdacoes'><button class='icon-pencil verd btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='icon-trash ver btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  
  
  });
 }
