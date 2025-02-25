import { Component } from '@angular/core';
import { PlanoTelefonia } from '../models/planotelefonia.model';
import { HttpProviderPlanoService } from '../service/http-provider-plano.service';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-planotelefonia',
  templateUrl: './planotelefonia.component.html',
  styleUrl: './planotelefonia.component.scss'
})
export class PlanotelefoniaComponent {
  
  message: { type: string, text: string } | null = null;
  planoTelefoneList: PlanoTelefonia[] = [];
  planoForm: PlanoTelefonia = new PlanoTelefonia() ; // Nova instância para o formulário
  clientes: any[] = []; // Para armazenar os clientes
  isModalOpen: boolean = false;
  isEditing: boolean = false;

  constructor(private httpProvider : HttpProviderPlanoService, private clienteService: HttpProviderService) {}
   
  updateCliente(){}
  deleteCliente()
  {

  }

  ngOnInit(): void {
    this.getAllPlano();
    this.getAllClientes();
  }


  getAllPlano() {
    this.httpProvider.getTodosPlanos().subscribe((data: any) => {
      if(data != null && data.body != null)
        {
          this.planoTelefoneList = data.body;
        }

      }, (error) => {
        if (error && error.status == 404) {
          this.planoTelefoneList = [];
        }
    });
  }

  getAllClientes() {
    this.clienteService.getCliente().subscribe(
      (response: any) => {
        if (response != null && response.body != null) {
          this.clientes = response.body; // Salvar clientes
        }
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }

  
  showMessage(type: string, text: string) {
    this.message = { type, text };
    
    // Remover a mensagem após 5 segundos
    setTimeout(() => {
      this.message = null;
    }, 5000); // 5000 milissegundos = 5 segundos
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openModal(planoTelefonia?: PlanoTelefonia) {
      if (planoTelefonia) {
        this.isEditing = true;
        this.planoForm = { ...planoTelefonia }; 
      } else {
        this.isEditing = false;
        this.planoForm = new PlanoTelefonia();
      }
  
      this.isModalOpen = true; // Abrir o modal
    }

    adicionarPlano() {
      if (this.isEditing) {
        // Atualizar cliente
        this.httpProvider.salvarPlano(this.planoForm).subscribe(
          (response) => {
            console.log('Cliente salvo com sucesso!', response);
            this.showMessage('success', 'Cliente atualizado com sucesso!');
            this.getAllPlano(); // Recarregar a lista de clientes
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
          nome: this.planoForm.nome,
          preco: this.planoForm.preco,
          franquiaDados: this.planoForm.franquiaDados,
          minutosLigacao: this.planoForm.minutosLigacao,
          clienteId: this.planoForm.clienteId,  // O clienteId que foi selecionado no frontend
          planoId: this.planoForm.planoId,      // O planoId já está presente
          clientePlanos: this.planoForm.clienteId && this.planoForm.planoId ? [
            {
              clienteId: this.planoForm.clienteId,
              planoId: this.planoForm.planoId
            }
          ] : []
        };
        
        this.httpProvider.salvarPlano(clienteData).subscribe(
          (response) => {
            console.log('Cliente salvo com sucesso!', response);
            this.showMessage('success', 'Cliente cadastrado com sucesso!');
            this.getAllPlano(); // Recarregar a lista de clientes
            this.closeModal(); // Fechar o modal após salvar
          },
          (error) => {
            console.error('Erro ao salvar cliente', error);
            this.showMessage('error', 'Erro ao cadastrar cliente. Tente novamente.');
          }
        );
      }
    }
    
}

