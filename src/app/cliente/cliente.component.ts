import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../service/http-provider.service';
import { Cliente } from '../models/cliente.model'; // Importe corretamente o modelo Cliente
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
  closeResult = '';
  clienteList: Cliente[] = [];
  clienteForm: Cliente = new Cliente(); // Nova instância para o formulário
  isModalOpen: boolean = false; // Controle para abrir/fechar o modal
  isEditing: boolean = false; // Controle para saber se estamos editando um cliente

  modalElement: any;
  // Variável para controlar a mensagem
message: { type: string, text: string } | null = null;


  constructor(private httpProvider : HttpProviderService, private router: Router) {
    
  }

  
  ngOnInit(): void {
    this.getAllCliente();
  }


  getAllCliente() {
    this.httpProvider.getCliente().subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.clienteList = data.body; // Armazenar os dados na lista de clientes
      }
    }, (error: any) => {
      if (error && error.status == 404) {
        this.clienteList = []; 
      }
    });
  }

  // Método para adicionar ou editar cliente
adicionarCliente() {
  if (this.isEditing) {
    // Atualizar cliente
    this.httpProvider.salvarCliente(this.clienteForm).subscribe(
      (response) => {
        console.log('Cliente salvo com sucesso!', response);
        this.showMessage('success', 'Cliente atualizado com sucesso!');
        this.getAllCliente(); // Recarregar a lista de clientes
        this.closeModal(); // Fechar o modal após salvar
      },
      (error) => {
        console.error('Erro ao salvar cliente', error);
        this.showMessage('error', 'Erro ao atualizar cliente. Tente novamente.');
      }
    );
  } else {
    // Adicionar novo cliente
    const clienteData = {
      nome: this.clienteForm.nome,
      cpf: this.clienteForm.cpf,
      telefone: this.clienteForm.telefone,
      email: this.clienteForm.email,
      clientePlanos: null // Supondo que não estamos adicionando planos nesse momento
    };

    this.httpProvider.salvarCliente(clienteData).subscribe(
      (response) => {
        console.log('Cliente salvo com sucesso!', response);
        this.showMessage('success', 'Cliente cadastrado com sucesso!');
        this.getAllCliente(); // Recarregar a lista de clientes
        this.closeModal(); // Fechar o modal após salvar
      },
      (error) => {
        console.error('Erro ao salvar cliente', error);
        this.showMessage('error', 'Erro ao cadastrar cliente. Tente novamente.');
      }
    );
  }
}

// Função para mostrar a mensagem
showMessage(type: string, text: string) {
  this.message = { type, text };
  
  // Remover a mensagem após 5 segundos
  setTimeout(() => {
    this.message = null;
  }, 5000); // 5000 milissegundos = 5 segundos
}
  
  editCliente(cliente: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.clienteForm = { ...cliente }; // Preencher o formulário com os dados do cliente selecionado
  }

  // Método para excluir um cliente
  // deleteCliente(id: string) {
  //   this.httpProvider.deleteClientePorId(id).subscribe(() => {
  //     this.getAllEmployee();
  //   });
  // }

  updateCliente(){}
  deleteCliente()
  {

  }


  showModal(){
    this.modalElement.showModal();
  }

  openModal(cliente?: Cliente) {
    if (cliente) {
      this.isEditing = true;
      this.clienteForm = { ...cliente }; // Carregar os dados do cliente para edição
    } else {
      this.isEditing = false;
      this.clienteForm = new Cliente(); // Limpar os dados para novo cliente
    }

    this.isModalOpen = true; // Abrir o modal
  }

  // Método para fechar o modal
  closeModal() {
    this.isModalOpen = false;
  }
}

