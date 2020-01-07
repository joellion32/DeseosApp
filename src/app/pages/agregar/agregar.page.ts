import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista:Lista;
  nombreItem = '';

  constructor(private dataService: DataService, private router: ActivatedRoute, public toastController: ToastController) { 
    // metodo para obtener el id mediante la url
    const ListaId = this.router.snapshot.paramMap.get('id');
    this.lista = this.dataService.ObtenerLista(ListaId);
    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    //agregar items a la lista
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.dataService.guardarStorage();
  }

  // para el cambio del check
  cambioCheck(item:ListaItem){
    // para mostrar items pendientes
    const pedientes = this.lista.items.filter(itemData => !itemData.estado).length;

    if(pedientes === 0){
     this.lista.terminada_en = new Date();
     this.lista.terminada = true; 
    }else{
    this.lista.terminada_en = null;
     this.lista.terminada = false; 
    }
    this.dataService.guardarStorage();
  }


  // para eliminar item
  async eliminar(item:number){
    // metodo para remover arreglo
    this.lista.items.splice(item, 1);
    this.dataService.guardarStorage();

    const toast = await this.toastController.create({
      message: `Item ${item} eliminado correctamente`,
      duration: 2000
    });
    toast.present();
  }

}
