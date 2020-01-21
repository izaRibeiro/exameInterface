import { EstadosService } from './../estados.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  private estados: any = [];

  constructor(
    private estadoService: EstadosService
  ) { }

  ngOnInit() {

    this.estadoService.getEstados().subscribe(
      res => {
        this.estados = res;
      }
    )
  }

}
