import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioFiltroComponent } from '../../components/servicio-filtro/servicio-filtro';
import { LandingPage } from '../landing/landing';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-salida',
  templateUrl: 'salida.html',
})
export class SalidaPage {

  public tipoFiltro;
  public resistencias;
  public rF; //para filtro pasa altas 40
  public capacitor;
  public c2; //para filtro pasa altas 40
  public r2; //para pasa altas de 40
  public frecuencia;
  public error;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicioFiltro: ServicioFiltroComponent
  ) {
    this.tipoFiltro = servicioFiltro.tipoFiltro;
    this.resistencias = servicioFiltro.resistencias;
    this.capacitor = servicioFiltro.capacitor;
    this.error = servicioFiltro.error;
    this.frecuencia = servicioFiltro.frecuencia;
    this.rF = servicioFiltro.rF;
    this.r2 = servicioFiltro.r2;
    this.error = servicioFiltro.error;
    this.c2 = servicioFiltro.c2;
  }

  cambiarPage() {
    this.navCtrl.push(LandingPage);
  }

}
