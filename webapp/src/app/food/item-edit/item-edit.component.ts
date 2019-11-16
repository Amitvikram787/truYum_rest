import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import {  Params, ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from '../food-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
    editForm:FormGroup;
    error:string;
    formEdited=false;
  constructor(private foodService:FoodService, private router:Router, private route:ActivatedRoute,private menuItemService:MenuItemService) { }
  productEdited:boolean=false;

  ngOnInit() {
      this.editForm=new FormGroup({
        'id':new FormControl(),
        'imgSrc':new FormControl(),
        'name':new FormControl(null,[Validators.required,Validators.maxLength(200)]),
       'price':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
        'dateOfLaunch':new FormControl(null, [Validators.required]),
        'active':new FormControl(null),
        'category':new FormControl(null,Validators.required),
         'freeDelivery':new FormControl(null),
         });



          this.route.params.subscribe((params:Params)=>
            {
                const prodId=params['id'];
                 this.menuItemService.getMenuItems(prodId).subscribe((product:FoodItem)=>
      
                {
                  product.dateOfLaunch=new Date(product.dateOfLaunch);
        if(product)
        {
         this.editForm.patchValue({
          id:product.id,
          imgSrc:product.imgSrc,
          name:product.name,
          price:product.price,
          dateOfLaunch:product.dateOfLaunch.toISOString().slice(0,10),
          active:product.active,
          category:product.category,
          freeDelivery:product.freeDelivery
         });
         
        }

          else{
           this.router.navigate(['not-found']);

          }
        
      })
  
            })
}





onSubmitEditForm()
 {
  // this.formEdited=true;
  //  console.log(this.editForm);
    this.productEdited=true;
  console.log(this.editForm.value);
  this.menuItemService.updateMenuItem(this.editForm.value).subscribe(data=>
    {
      console.log("subcribed");
    });
 }
}
