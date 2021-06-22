import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { paisesService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre:'Rubén',
    apellido: 'Onivenis Muñoz',
    correo: 'rubenom11@gmail.com',
    pais: ""
  }

  paises: any [] = [];

  constructor(
    private _paisesService:paisesService
  ) { }

  ngOnInit(): void {
    this._paisesService.getPaises()
    .subscribe( (paises:any) => {
      console.log(paises);
      this.paises = paises;
      this.paises.unshift({ //El unshift es como el push, pero el push lo pone al final y el unshift al principio
        name:'[Seleccione pais]',
        alpha3Code: ""
      })
    })
  }

  public guardar(forma:NgForm){
    console.log(forma);
    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }

}
