import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  listas:Lista[] = [];


  constructor(public toastController: ToastController) {
    this.cargarStorage();
  }


  AgregarLista(titulo:string){
    let lista = new Lista(titulo);
    this.listas.push(lista);
    // para guardar en el local storage
    this.guardarStorage();
    return lista.id;
  }

// funcion para guardar en el local storage
  guardarStorage(){
    localStorage.setItem('lista', JSON.stringify(this.listas));
  }

  // funcion para cargar el local storage
  cargarStorage(){
    if( localStorage.getItem('lista')){
      this.listas = JSON.parse(localStorage.getItem('lista'));
    }else{
     this.listas = []; 
    }
  }

  // para obtener la lista para poder verla en otra pagina
  ObtenerLista(id:string | number){
    id = Number(id);
    return this.listas.find(listaData=> listaData.id === id);
  }

  async borrarLista(lista: Lista){
    this.listas = this.listas.filter(ListaData=> ListaData.id !== lista.id);
    this.guardarStorage();

    const toast = await this.toastController.create({
      message: 'Lista eliminada correctamente.',
      duration: 2000
    });
    toast.present();
  }

}
