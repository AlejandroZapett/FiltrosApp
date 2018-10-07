import { Component } from '@angular/core';
import { ServicioFiltroComponent } from '../servicio-filtro/servicio-filtro';
import { ViewController, NavController } from 'ionic-angular';
import { SalidaPage } from '../../pages/salida/salida';

@Component({
  selector: 'input-component',
  templateUrl: 'input.html'
})
export class InputComponent {

  private capacitor;
  private resistencias;
  private frecuencia;
  /*
  private LSCapacitor;
  private LICapacitor;
  private LSResistencia;
  private LIResistencia;
  */


  constructor(
    private servicioFiltro:ServicioFiltroComponent,
    private nav:NavController
  ) {

  }

  public calcular(){
    this.servicioFiltro.setParams(this.capacitor, this.frecuencia);
    this.servicioFiltro.calcularResistencias();
    this.nav.push(SalidaPage);
  }



}
