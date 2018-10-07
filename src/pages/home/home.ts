import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ServicioFiltroComponent } from '../../components/servicio-filtro/servicio-filtro';
import { SalidaPage } from '../../pages/salida/salida';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private tipoFiltro:string = '';
  private Filtros = {
    'pasaAltas20': 'Pasa Altas de 20 dB/dec',
    'pasaBajas20':'Pasa Bajas 20 dB/dec',
    'pasaAltas40': 'Pasa Altas 40 dB/dec',
    'pasaBajas40':'Pasa Bajas 40 dB/dec'
  };

  private capacitor;
  private resistencias;
  private frecuencia;

  constructor(
    public navCtrl: NavController,
    private servicioFiltro: ServicioFiltroComponent,
    private viewCtrl: ViewController,
    private nav:NavController
  ) {
    this.tipoFiltro = '';
    this.frecuencia= '';
    this.servicioFiltro.setCapacitoresComerciales();
    this.servicioFiltro.setResistenciasComerciales();
    this.servicioFiltro.valoresIniciales();
  }
  public  dismiss(e){
    this.viewCtrl.dismiss(null);
  }
  public setFiltro(){
    this.servicioFiltro.setTipoFiltro(this.Filtros[this.tipoFiltro]);
  }
  public buttonFiltro(filtro){
    this.tipoFiltro = filtro;
    this.setFiltro();
  }
  public calcular(){
    this.servicioFiltro.setFrecuencia(this.frecuencia);
    this.servicioFiltro.calcularResistencias();
    this.nav.push(SalidaPage);
  }
}
