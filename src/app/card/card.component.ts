import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  calculoForm!: FormGroup;
  resultado!: string;
  sum!: number;
  cantidadPob!:string;
  checkBoxMarcado = false;
  formulaDiv: any;
  content: string = ''; // Inicializa con un valor si es necesario
  content2: string = ''; // Inicializa con un valor si es necesario

  content1 = document.getElementById('content1') as HTMLDivElement;
  content23 = document.getElementById('content2') as HTMLParagraphElement;



  constructor(private readonly fb: FormBuilder){

  }

  ngOnInit(): void {
    this.calculoForm = this.fb.group({
      poblationForm: ['', [Validators.required]],
       nivel:['',[Validators.required , Validators.pattern(/^[0-9]*$/ )]],
      precision: ['',[Validators.required ,Validators.pattern(/^[0-9]*$/) ]],
      cantPoblacion: ['',[Validators.required ,Validators.pattern(/^[0-9]*$/)]]
     })





       this.calculoForm.get('poblationForm')?.valueChanges.subscribe((value: any) =>{


        if(value == "opcion2"){

          this.calculoForm.get('cantPoblacion')?.disable();
        } else{
          this.calculoForm.get('cantPoblacion')?.enable();

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

 
  

  onSubmit(){

   let N= this.cantPoblaControl?.value;
   let Z = this.nivelControl?.value;
   let e = this.precisionControl?.value;
   const contElement = document.getElementById("cont");

 
  if(this.calculoForm.get('poblationForm')?.value == 'opcion1'){

    if(this.nivelControl?.value == 95){

      // const suma = Math.pow(2,2)
      
      Z=  1.96
   
      const suma = (N*Math.pow(1.96,2)*(0.5)*(0.5))/(Math.pow(e/100,2)*(N-1)+Math.pow(1.96,2)*(0.5)*(0.5))
      this.content = `$x = {${N}*(${Z}^2)(0.5)(0.5) \\over (\\frac{${e}}{100})^2 (${N}-1)+ (${Z}^2)(0.5)(0.5)}$`  
      this.content2 = "="+suma.toString()

     
      
    } else{

      Z=  2.58
      const suma = (N*Math.pow(2.58,2)*(0.5)*(0.5))/(Math.pow(e/100,2)*(N-1)+Math.pow(2.58,2)*(0.5)*(0.5))
      this.content = `$x = {${N}*(${Z}^2)(0.5)(0.5) \\over (\\frac{${e}}{100})^2 (${N}-1)+ (${Z}^2)(0.5)(0.5)}$`  
      this.content2 = "="+suma.toString()
  

    }


  } else{


    if(this.nivelControl?.value == 95){

      // const suma = Math.pow(2,2)
      Z = 1.96
      const suma = (Math.pow(1.96,2)*(0.5)*(0.5))/(Math.pow(e/100,2))
      this.content = `$x = {(${Z}^2)(0.5)(0.5) \\over (${e})^2}$`  
      this.content2 = "="+suma.toString()


      
    } else{

      Z = 2.58
      const suma = (Math.pow(2.58,2)*(0.5)*(0.5))/(Math.pow(e/100,2))

      this.content = `$x = {(${Z}^2)(0.5)(0.5) \\over (${e})^2}$`  
      this.content2 = "="+suma.toString()

    }

  }




    
    if (this.calculoForm.valid) {

      this.resultado = "Todos los datos son válidos";
      const opcionSeleccionada = this.calculoForm.get('poblationForm')?.value;
      console.log(opcionSeleccionada)
      console.log('Form ->', this.calculoForm.value)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...no puedes seguir',
        text: 'Llena los campos por favor',
      })
    
    }

  }

  limpiar(){

    this.calculoForm.reset();
    this.content = '';
    this.content2 = '';
    this.content1.textContent = '';
    this.content23.textContent = '';


  }

 

}
