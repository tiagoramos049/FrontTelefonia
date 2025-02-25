import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  // Dados para os gráficos
  pieChartData: any;
  barChartData: any;

  indicadores: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getIndicadores();
  }

  getIndicadores() {
    this.http.get<any>('https://localhost:7104/api/Dashboard/Indicadores')
      .subscribe(
        data => {
          this.indicadores = data;

          // Inicialize os gráficos após obter os dados

          // Gráfico de Pizza
          this.pieChartData = {
            labels: ['Total Clientes', 'Total Planos'], // Etiquetas
            datasets: [{
              data: [data.totalClientes, data.totalPlanos], // Dados do gráfico
              backgroundColor: ['#FF6384', '#36A2EB'], // Cores do gráfico
              hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
          };

          // Gráfico de Barras (exemplo)
          this.barChartData = {
            labels: ['Clientes', 'Planos'], // Etiquetas
            datasets: [{
              label: 'Quantidade',
              data: [data.totalClientes, data.totalPlanos],
              backgroundColor: '#FF6384', // Cor da barra
              borderColor: '#FF6384',
              borderWidth: 1
            }]
          };

        },
        error => {
          console.error('Erro ao buscar indicadores', error);
          // Aqui você pode lidar com o erro, como mostrar uma mensagem para o usuário
        }
      );
  }
}
