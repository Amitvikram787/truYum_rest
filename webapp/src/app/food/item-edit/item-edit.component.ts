import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import {  Params, ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from '../food-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
    editForm:FormGroup;
  constructor(private foodService:FoodService, private router:Router, private route:ActivatedRoute) { }
  productEdited:boolean=false;

  ngOnInit() {
      this.editForm=new FormGroup({
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
                 this.foodService.getItem(prodId).subscribe((product:FoodItem)=>
      
                {
        if(product)
        {
         this.editForm.patchValue({
          name:product.name,
          price:product.price,
          dateOfLaunch:product.dateOfLaunch,
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
   console.log(this.editForm);
   this.productEdited=true;
 }
}
