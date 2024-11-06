import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

@Injectable({
  providedIn: 'root',
})
export class VideoCallService {
  private socket: any;
  private peer!: SimplePeer.Instance;
  private localStream!: MediaStream;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  async getMediaStream(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
      throw error;
    }
  }

  initializePeer(isInitiator: boolean) {
    this.peer = new SimplePeer({
      initiator: isInitiator,
      stream: this.localStream,
      trickle: false,
    });

    this.peer.on('signal', (data) => {
      if (isInitiator) {
        this.socket.emit('offer', data);
      } else {
        this.socket.emit('answer', data);
      }
    });

    this.peer.on('stream', (stream) => {
      const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
      if (remoteVideo) {
        remoteVideo.srcObject = stream;
        remoteVideo.play();
      }
    });

    this.socket.on('offer', (data: any) => {
      if (!isInitiator) {
        this.peer.signal(data);
      }
    });

    this.socket.on('answer', (data: any) => {
      if (isInitiator) {
        this.peer.signal(data);
      }
    });

    this.socket.on('candidate', (data: any) => {
      this.peer.signal(data);
    });
  }

  sendCandidate(data: any) {
    this.socket.emit('candidate', data);
  }
}
