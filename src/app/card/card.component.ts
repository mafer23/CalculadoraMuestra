import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  calculoForm!: FormGroup;
  resultado!: string;
  sum: number = 0;


  constructor(private readonly fb: FormBuilder){

  }

  ngOnInit(): void {
    this.calculoForm = this.fb.group({
      poblationForm: ['opcion1', [Validators.required]],
      nivel:['',[Validators.required , Validators.pattern(/^[0-9]*$/ )]],
      precision: ['',[Validators.required ,Validators.pattern(/^[0-9]*$/) ]],
      cantPoblacion: ['',[Validators.required ,Validators.pattern(/^[0-9]*$/)]]
     })


       this.calculoForm.get('poblationForm')?.valueChanges.subscribe((value: any) =>{
      const cantPoblacionControl = this.calculoForm.get('cantPoblacion');

      if (cantPoblacionControl) {
          if (value) {
            cantPoblacionControl.enable(); // Habilitar el campo
          } else {
             cantPoblacionControl.disable(); // Deshabilitar el campo
          }
       }
   })

  }

  get nivelControl() {
    return this.calculoForm.get('nivel');
  }
  get precisionControl() {
    return this.calculoForm.get('precision');
  }
  get cantPoblaControl() {
    return this.calculoForm.get('cantPoblacion');
  }
  get poblationForm() {
    return this.calculoForm.get('poblationForm');
  }

  limpiarForm(){
    this.calculoForm.reset();
  }

  calcular(){
    this.onSubmit();
  }


  onSubmit(){

   let N= this.cantPoblaControl?.value;
   let Z = this.nivelControl?.value;
   let e = this.precisionControl?.value;

  if(this.calculoForm.get('poblationForm')?.value == 'opcion1'){

    if(this.nivelControl?.value == 95){

      // const suma = Math.pow(2,2)
      const suma = (N*Math.pow(1.96,2)*(0.5)*(0.5))/(Math.pow(e/100,2)*(N-1)+Math.pow(1.96,2)*(0.5)*(0.5));
      this.sum = suma;
      console.log(this.sum );

    } else{

      const suma = (N*Math.pow(2.58,2)*(0.5)*(0.5))/(Math.pow(e/100,2)*(N-1)+Math.pow(2.58,2)*(0.5)*(0.5));
      this.sum = suma;
      console.log(this.sum );
      console.log("Buenas");

    }


  } else{


    if(this.nivelControl?.value == 95){

      // const suma = Math.pow(2,2)
      const suma = (Math.pow(1.96,2)*(0.5)*(0.5))/(Math.pow(e/100,2))
      this.sum = suma;
      console.log(this.sum);

    } else{

      const suma = (Math.pow(2.58,2)*(0.5)*(0.5))/(Math.pow(e/100,2))
      this.sum = suma;
      console.log(this.sum );
      console.log("poblacion infinita");

    }

  }



    if (this.calculoForm.valid) {

      this.resultado = "Todos los datos son válidos";
      const opcionSeleccionada = this.calculoForm.get('poblationForm')?.value;
      console.log(opcionSeleccionada)
      console.log('Form ->', this.calculoForm.value)
    } else {
      this.resultado = "No son validos";
      console.log('No son validos')
    }

  }



}
