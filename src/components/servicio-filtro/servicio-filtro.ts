import { Component, Injectable } from '@angular/core';

@Injectable()
export class ServicioFiltroComponent {

  public tipoFiltro:String;
  public resistencias = [0, 0]; //resistencias utilizadas para el filtro
  public capacitor:number; //capacitor del filtro
  public frecuencia:number; //frecuencia de corte del filtro

  public capacitoresComerciales; //array con valores de capacitores comerciales
  public resistenciasComerciales; //array con los valores de resistencias comerciales

  private LSCapacitor;
  private LICapacitor;
  private LSResistencia;
  private LIResistencia;

  public error;
  public rF;
  public c2;
  public r2;

  constructor() {
  }
  public valoresIniciales() {
    this.error = 100;
    this.r2 = 0;
    this.rF = 0;
    this.c2 = 0;
  }
  public setFrecuencia(frecuencia){
    this.frecuencia = frecuencia*2*3.14; //conversion de unidades
  }

  public setTipoFiltro(tipoFiltro) {
    this.tipoFiltro = tipoFiltro;
  }
  public setParams(capacitor, frecuencia){
    this.capacitor = capacitor;
    this.frecuencia = frecuencia;
  }

  public setLimites(LSC, LIC, LSR, LIR){
    this.LSCapacitor = LSC;
    this.LICapacitor = LIC;
    this.LIResistencia = LIR;
    this.LSResistencia = LSR;
  }
  public setCapacitoresComerciales(){
    //en microFaradios
    this.capacitoresComerciales = [
      0.001,0.039,0.04,0.047,0.05,
      0.056,0.06,0.068,0.07,0.08,
      0.082,0.1,0.12,0.15,0.18,
      0.2,0.22,0.025,0.027,0.3,
      0.39,0.4,0.47,0.5,0.56,
      0.6,0.68,0.7,0.8,0.82,
      1
    ];
  }
  public setResistenciasComerciales(){
    //en ohms
    this.resistenciasComerciales = [
      1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.1, 
      5.6, 6.8, 8.2, 10, 12, 15, 18, 22, 27, 33, 
      39, 47, 51, 56, 68, 82, 100, 120, 150, 180, 
      220, 270, 330, 390, 470, 510, 560, 680, 820, 1000, 
      1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5100, 5600,
      6800, 8200, 10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000,
      47000, 51000, 56000, 68000, 82000, 100000, 120000, 150000, 180000, 220000,
      270000, 330000, 390000, 470000, 510000, 560000, 680000, 820000,
      1000000, 1200000, 1500000, 1800000, 2200000, 2700000, 3300000,
      3900000, 4700000, 5100000, 5600000, 6800000, 8200000, 10000000
    ];
  }
  
  public calcularResistencias(){
    var resistencia = 0;
    var resistenciaComercial;
    var errorBase = 0.05;
    console.log(this.resistenciasComerciales);
    //algoritmo para encontrar las resistencias adecuadas
    for(var i =0; i<this.capacitoresComerciales.length; i++){
      switch(this.tipoFiltro){
        case 'Pasa Altas de 20 dB/dec':
          resistencia = this.ecuacionUno(this.capacitoresComerciales[i]);
          break;
        case 'Pasa Bajas 20 dB/dec':
          resistencia = this.ecuacionDos(this.capacitoresComerciales[i]);
          break;
        case 'Pasa Altas 40 dB/dec':
          resistencia = this.ecuacionTres(this.capacitoresComerciales[i]);
          break;
        case 'Pasa Bajas 40 dB/dec':
          resistencia = this.ecuacionCuatro(this.capacitoresComerciales[i]);
          break;
      }
      
      for(var j=0; j<this.resistenciasComerciales.length; j++){
        var error = this.porcentajeError(this.resistenciasComerciales[j], resistencia);
        if(error < errorBase){
          errorBase = error;
          resistenciaComercial = this.resistenciasComerciales[j];
          this.capacitor = this.capacitoresComerciales[i];
          if (error == 0){break;} //rompe con el proceso
        }
        //añadir dos iteraciones
      }
    }
    this.resistencias[0] = resistenciaComercial;
    this.error = errorBase;
    this.resistenciaF(); //asigna los parametros faltantes
    
  }
  
  public ecuacionUno(c){
    //Regresa el valor de R filtro pasa altas 20
    return 1/(this.frecuencia*c*0.000001);
  }
  public ecuacionDos(c){
    //Regresa el valor de R filtro pasa bajas 20
    return 1/(this.frecuencia*c*0.000001);
  }
  public ecuacionTres(c){
    //Regresa el valor de R filtro pasa altas 40
    return 1.414/(this.frecuencia*c*0.000001);
  }
  public ecuacionCuatro(c){
    //Regresa el valor de R filtro pasa bajas 40
    return 0.707/(this.frecuencia*c*0.000001);
  }
  public porcentajeError(rComercial, rCalculada){
    var error =  Math.abs(rComercial-rCalculada)/rCalculada;
    return error
  }
  public resistenciaF(){
    switch(this.tipoFiltro){
      case 'Pasa Altas de 20 dB/dec':
        this.rF = this.resistencias[0];
        break;
      case 'Pasa Bajas 20 dB/dec':
        this.rF = this.resistencias[0];
        break;
      case 'Pasa Altas 40 dB/dec':
        this.rF = this.resistencias[0];
        this.r2 = this.resistencias[0]/2;
        this.c2 = this.capacitor;
        break;
      case 'Pasa Bajas 40 dB/dec':
        this.rF = 2*this.resistencias[0];
        this.r2 = this.resistencias[0];
        this.c2 = this.capacitor;
        break;
    }
  }

}
