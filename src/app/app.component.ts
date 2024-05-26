import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(localePt, 'pt-BR');


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxPaginationModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gamaWeb';

  empresas: any[] = [];
  insights: string = '';

  paginador: number = 1;
  
  constructor(
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {
    this.httpClient.get('http://localhost:8080/api/empresas/consultar')
    .subscribe({
      next: (data) => {
        this.empresas = data as any;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  loadInsights(): void {
    this.httpClient.get('http://localhost:8080/api/empresas/desempenho')
      .subscribe({
        next: (data: any) => {
          // Substitua todas as ocorrências de \n por <br> na string de insights
          this.insights = data.desempenho.replace(/\n/g, '<br>');
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }
  
  handlePageChange(event: any) : void {
    this.paginador = event;
  }
}
