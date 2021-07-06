import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ConfigurationService } from 'services/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() content;
  @Output() getOrderListLatest = new EventEmitter();
  public statusList = [];
  public status = '';
  public id = '';
  public is_active='active';
  public is_readonly=false;
  constructor(
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService,
    private router:Router,
    
  ) { }

  ngOnInit() {
    // this.statusList = this.content;
    this.getOrderStatus();
    this.status = this.content['Status'];
    console.log(this.status);
    if(this.status == 'Cancelled' || this.status == 'Returned'){
      this.is_readonly=true;
    }
    else{
      this.is_readonly=false;
    }
    console.log("statsu",this.status);
    this.id = this.content['Id'];
  }
  UpdateOrderStatus(statusId){
    this.status=status;
    const model={};
    model['orderId']=this.id;
    model['orderStatusId']=statusId;

    this.configService.UpdateOrderStatus(model).subscribe(res => {
      if (res) {
        this.toastr.success('Order Status updated successfully.', 'Order Status');
        this.getOrderListLatest.emit('true');
        this.activeModal.close();
        // this.configService.GetOrderList({}).subscribe(res => {
        // console.log("res",res);
        // });
        //this.ngOnInit();
        //this.router.navigate(["order"]);
      }
      else{
        this.toastr.error('Error! Order Status not updated successfully.', 'Order Status');
      }
    });
  }
  public getOrderStatus = () => {
    this.configService.GetOrderStatus({}).subscribe(res => {
      this.statusList = res;
      console.log("statusList",this.statusList);
    })
  }
}
