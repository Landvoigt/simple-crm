import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  user = new User();
  userID = '';
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  ngOnInit(): void {
  }

  async editUser() {
    this.loading = true;
    const userDocRef = doc(this.firestore, 'users', this.userID);
    const newData = this.user.toJSON();

    await updateDoc(userDocRef, newData);
    
    this.dialogRef.close();
    this.loading = false;
  }
}