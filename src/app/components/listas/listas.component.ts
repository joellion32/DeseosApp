import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList, {static: false}) lista: IonList;
  @Input() terminada = true;

  constructor(public dataService: DataService, private router: Router, public alertController: AlertController,
    public toastController: ToastController) {
      console.log(this.dataService.listas);
    }

  ngOnInit() {}


  paginadetalle(id:number){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
    }
  }

  eliminarLista(lista: Lista){
    console.log(lista);
    this.dataService.borrarLista(lista);
  }

  async editarLista(item: Lista){
    const alert = await this.alertController.create({
      header: 'Editar Titulo',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: `${item.titulo}`
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
           console.log('cancelar'); 
           this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data)=>{
            console.log(data); 
            if(data.titulo.length === 0){
              return;
            }
            // actualizar titulo
            item.titulo = data.titulo; 
            this.dataService.guardarStorage();
            this.lista.closeSlidingItems();
           }
        }
      ],
    });

    await alert.present();
  
  }

}