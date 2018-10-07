import { NgModule } from '@angular/core';
import { ServicioFiltroComponent } from './servicio-filtro/servicio-filtro';
import { MenuComponent } from './menu/menu';
import { InputComponent } from './input/input';
@NgModule({
	declarations: [ServicioFiltroComponent,
    MenuComponent,
    InputComponent],
	imports: [],
	exports: [ServicioFiltroComponent,
    MenuComponent,
    InputComponent]
})
export class ComponentsModule {}
