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
        // Atualizar plano existente
        this.httpProvider.salvarPlano(this.planoForm).subscribe(
          (response) => {
            this.message = { text: 'Plano alterado com sucesso!', type: 'success' };
            this.closeModal();
          },
          (error) => {
            this.message = { text: 'Erro ao alterar plano', type: 'error' };
          }
        );
      } else {
        // Adicionar um novo plano
        this.httpProvider.salvarPlano(this.planoForm).subscribe(
          (response) => {
            this.message = { text: 'Plano salvo com sucesso!', type: 'success' };
            this.closeModal();
          },
          (error) => {
            this.message = { text: 'Erro ao salvar plano', type: 'error' };
          }
        );
      }
    }
}

