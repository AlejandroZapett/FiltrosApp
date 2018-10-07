import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { SalidaPage } from '../../pages/salida/salida';
import { ServicioFiltroComponent } from '../servicio-filtro/servicio-filtro';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  private tipoFiltro:string = '';
  private Filtros = {
    'pasaAltas20': 'pasaAltas20',
    'pasaBajas20':'pasaBajas20',
    'pasaAltas40': 'pasaAltas40',
    'pasaBajas40':'pasaBajas40'
  };

  constructor(
    private nav:NavController,
    private servicioFiltro:ServicioFiltroComponent
  ) {
    this.servicioFiltro.setCapacitoresComerciales();
    this.servicioFiltro.setResistenciasComerciales();
  }

  public setFiltro(){
    this.servicioFiltro.setTipoFiltro(this.Filtros[this.tipoFiltro]);
  }
  public buttonFiltro(filtro){
    this.tipoFiltro = filtro;
    this.setFiltro();
  }

}
