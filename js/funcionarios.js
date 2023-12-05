if(localStorage.getItem('lista') == null) {
    lista = [];
    localStorage.setItem('lista', JSON.stringify(lista));
} else {
    lista = JSON.parse(localStorage.getItem('lista'));
}

// Aguarda o carregamento do HTML para ser executado
document.addEventListener('DOMContentLoaded', function() {

    // Chamadas
    listar();

    // Salva cadastro e edição
    document.querySelector('#bt-salvar').addEventListener('click', function() {
        // Adiciona dados dos campos ao array principal
        let id = document.querySelector('#campo-id').value;
        let texto = document.querySelector('#campo-texto').value;
        let numero = document.querySelector('#campo-numero').value;
        let cargo = document.querySelector('#campo-cargo').value; 
        let nascimento = document.querySelector('#campo-nascimento').value;
        let pais = document.querySelector('#campo-pais').value;
        let estado = document.querySelector('#campo-estado').value;
        let cidade = document.querySelector('#campo-cidade').value;
        let salario = document.querySelector('#campo-salario').value;
        
        // terminar aqui os campos //
        if(id != "") {
            let indice = getIndiceListaPorId(id)
            lista[indice] = {id: id, texto: texto, numero: numero, cargo: cargo, nascimento: nascimento, pais: pais, estado: estado, cidade: cidade, salario: salario};
        } else {
            lista.push({id: getMaiorIdLista()+1, texto: texto, numero: numero, cargo: cargo, nascimento: nascimento, pais: pais, estado: estado, cidade: cidade, salario: salario});
        }

        // Armazena a lista atualizada no navegador
        localStorage.setItem('lista', JSON.stringify(lista));

        // Reseta o formulário e recarrega a tabela de listagem
        this.blur();
        document.querySelector('#bt-cancelar').style.display = 'none';
        document.querySelector('#campo-id').value = "";
        document.querySelector('#campo-texto').value = "";
        document.querySelector('#campo-numero').value = "";
        document.querySelector('#campo-cargo').value = "";
        document.querySelector('#campo-nascimento').value = "";
        document.querySelector('#campo-pais').value = "";
        document.querySelector('#campo-estado'). value = "";
        document.querySelector('#campo-cidade').value = "";
        document.querySelector('#campo-salario').value = "";
        carregar("Salvo com sucesso!");
        listar();
    });

    // Cancelamento de edição
    document.querySelector('#bt-cancelar').addEventListener('click', function() {
        document.querySelector('#bt-cancelar').style.display = 'none';
        document.querySelector('#campo-id').value = "";
        document.querySelector('#campo-texto').value = "";
        document.querySelector('#campo-numero').value = "";
        document.querySelector('#campo-cargo').value = "";
        document.querySelector('#campo-nascimento').value = "";
        document.querySelector('#campo-pais').value = "";
        document.querySelector('#campo-estado'). value = "";
        document.querySelector('#campo-cidade').value = "";
        document.querySelector('#campo-salario').value = "";
    });

});

// Funções

function listar() {
    document.querySelector('table tbody').innerHTML = "";
    document.querySelector('#total-registros').textContent = lista.length;
    lista.forEach(function(objeto) {
        // Cria string html com os dados da lista
        let htmlAcoes = "";
        htmlAcoes += '<button class="bt-tabela bt-editar" title="Editar"><i class="ph ph-pencil"></i></button>';
        htmlAcoes += '<button class="bt-tabela bt-excluir" title="Excluir"><i class="ph ph-trash"></i></button>';
        
        let htmlColunas = "";
        htmlColunas += "<td>"+objeto.id+"</td>";
        htmlColunas += "<td>"+objeto.texto+"</td>";
        htmlColunas += "<td>"+objeto.numero+"</td>";
        htmlColunas += "<td>"+objeto.cargo+"</td>";
        htmlColunas += "<td>"+objeto.nascimento+"</td>";
        htmlColunas += "<td>"+objeto.pais+"</td>";
        htmlColunas += "<td>"+objeto.estado+"</td>";
        htmlColunas += "<td>"+objeto.cidade+"</td>";
        htmlColunas += "<td>"+objeto.salario+"</td>";
        htmlColunas += "<td>"+htmlAcoes+"</td>";
        
        // Adiciona a linha ao corpo da tabela
        let htmlLinha = '<tr id="linha-'+objeto.id+'">'+htmlColunas+'</tr>';
        document.querySelector('table tbody').innerHTML += htmlLinha;
    });

    eventosListagem();
    carregar();
}

function eventosListagem() {
    // Ação de editar objeto
    document.querySelectorAll('.bt-editar').forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega os dados do objeto que será alterado
            let linha = botao.parentNode.parentNode;
            let colunas = linha.getElementsByTagName('td');
            let id = colunas[0].textContent;
            let texto = colunas[1].textContent;
            let numero = colunas[2].textContent;
            let cargo = colunas[3].textContent;
            let nascimento = colunas[4].textContent;
            let pais = colunas[5].textContent;
            let estado = colunas[6].textContent;
            let cidade = colunas[7].textContent;
            let salario = colunas[8].textContent;
            
            
            // Popula os campos do formulário
            document.querySelector('#campo-id').value = id;
            document.querySelector('#campo-texto').value = texto;
            document.querySelector('#campo-numero').value = numero;
            document.querySelector('#campo-cargo').value = cargo;
            document.querySelector('#campo-nascimento').value = nascimento;
            document.querySelector('#campo-pais').value = pais;
            document.querySelector('#campo-estado').value = estado;
            document.querySelector('#campo-cidade').value = cidade;
            document.querySelector('#campo-salario').value = salario;

            // Exibe botão de cancelar edição
            document.querySelector('#bt-cancelar').style.display = 'flex';
        });
    });

    // Ação de excluir objeto
    document.querySelectorAll('.bt-excluir').forEach(function(botao) {
        botao.addEventListener('click', function() {
            if(confirm("Deseja realmente excluir?")) {
                // Remove objeto da lista
                let linha = botao.parentNode.parentNode;
                let id = linha.id.replace('linha-','');
                let indice = getIndiceListaPorId(id);
                lista.splice(indice, 1);

                // Armazena a lista atualizada no navegador
                localStorage.setItem('lista', JSON.stringify(lista));

                // Recarrega a listagem
                listar();
            }
        });
    });
}

function getIndiceListaPorId(id) {
    indiceProcurado = null;
    lista.forEach(function(objeto, indice) {
        if(id == objeto.id) {
            indiceProcurado = indice;
        }
    });
    return indiceProcurado;
}

function getMaiorIdLista() {
    if(lista.length > 0) {
        return parseInt(lista[lista.length-1].id);
    } else {
        return 0;
    }
}
