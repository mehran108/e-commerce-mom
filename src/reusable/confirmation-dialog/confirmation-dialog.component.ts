import { Component, OnInit, Inject, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  public isEdit = false;
  @Input() public header;
  @Input() public content;
  constructor(
    public location: Location,
    public route: ActivatedRoute,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  public saveAndClose = () => {
    this.activeModal.close(this.content);
  }
  public onNoClick = () => {
    this.activeModal.close();
  }
}
