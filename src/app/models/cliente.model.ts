export class Cliente {
  
  id: string; // Id como string, pois será utilizado como GUID no frontend
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  clientePlanos: any[]; // Aqui você pode definir os planos do cliente, caso necessário
  valid: any;
  value: any;

  constructor() {
    this.id = ''; // Iniciar com um valor padrão
    this.nome = '';
    this.cpf = '';
    this.telefone = '';
    this.email = '';
    this.clientePlanos = [null];
  }
}