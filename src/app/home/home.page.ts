import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  users: any[] = [];

  localVideo!: HTMLVideoElement;
  remoteVideo!: HTMLVideoElement;
  localStream!: MediaStream;
  peerConnection!: RTCPeerConnection;
  iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCollection('users').subscribe(data => {
      this.users = data;
    });

    this.localVideo = document.getElementById('localVideo') as HTMLVideoElement;
    this.remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
  }

  addItem() {
    const newItem = { full_name: 'New Item', mobile_no: 'Item mobile_no' ,password:"password"};
    this.authService.createDoc('users', newItem).then(() => {
      console.log('Document successfully written!');
    }).catch(error => {
      console.error('Error writing document: ', error);
    });
  }

  updateItem(id: string) {
    const updatedData = { full_name: 'New Item', mobile_no: 'Item mobile_no' ,password:"password"};
    this.authService.updateDoc('users', id, updatedData).then(() => {
      console.log('Document successfully updated!');
    }).catch(error => {
      console.error('Error updating document: ', error);
    });
  }

  deleteItem(id: string) {
    this.authService.deleteDoc('users', id).then(() => {
      console.log('Document successfully deleted!');
    }).catch(error => {
      console.error('Error deleting document: ', error);
    });
  }

}
