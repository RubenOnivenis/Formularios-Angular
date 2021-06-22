import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/service/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {

  forma!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private _validadoresService: ValidadoresService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.minLength(2)]],  //tenemos dos argumentos: '', [sincrona]. Nos faltaría la asíncrona que al no tener no 
                                                                    //se pone como tercer argumento
      apellido:['', [Validators.required, Validators.minLength(5), this._validadoresService.noApellido]],
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario : ['', , this._validadoresService.existeUsuario],
      pass1:['', Validators.required],
      pass2:['', Validators.required],
      direccion: this.formBuilder.group({
        distrito:['', Validators.required],
        ciudad:['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators:this._validadoresService.passwordsIguales('pass1', 'pass2')

    })
  }

  guardar(){
    console.log(this.forma);
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(control => control.markAsTouched());
        else
          control.markAsTouched();
      })
      return;
    }
    this.forma.reset({});
  }

  valido(texto:string){
    let elemento:any = this.forma.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);

  }

  cargarDatosFormulario(){
    this.forma.setValue({
      nombre: "",
      apellido: "",
      email: "",
      pass1:"",
      pass2:"",
      direccion: {
        distrito: "",
        ciudad: ""
      }
    })
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  agregarPasatiempo(){
    this.pasatiempos.push(this.formBuilder.control('Pasatiempo', Validators.required));
  }

  borrarPasatiempo(index: number){
    this.pasatiempos.removeAt(index);
  }

  get pass2Valido() {
    const pass1:any = this.forma.get('pass1')!.value;
    const pass2:any = this.forma.get('pass2')!.value;
    return (pass1 === pass2) ? true : false;
  }

}
