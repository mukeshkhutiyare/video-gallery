import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.page.html',
  styleUrls: ['./call-video.page.scss'],
})
export class CallVideoPage implements OnInit {
  localVideo!: HTMLVideoElement;
  remoteVideo!: HTMLVideoElement;
  localStream!: MediaStream;
  peerConnection!: RTCPeerConnection;
  iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };
  socket!: WebSocket;

  constructor() { }

  ngOnInit() {
    this.localVideo = document.getElementById('localVideo') as HTMLVideoElement;
    this.remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
    this.setupWebSocket();
  }

  setupWebSocket() {
    // this.socket = new WebSocket('ws://localhost:8080');
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case 'offer':
          this.handleOffer(data.offer);
          break;
        case 'answer':
          this.handleAnswer(data.answer);
          break;
        case 'candidate':
          this.handleRemoteIceCandidate(data.candidate);
          break;
      }
    };
  }

  async startCall() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localVideo.srcObject = this.localStream;

      this.peerConnection = new RTCPeerConnection(this.iceServers);
      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socket.send(JSON.stringify({
            type: 'candidate',
            candidate: event.candidate
          }));
        }
      };

      this.peerConnection.ontrack = event => {
        this.remoteVideo.srcObject = event.streams[0];
      };

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      this.socket.send(JSON.stringify({
        type: 'offer',
        offer: this.peerConnection.localDescription
      }));
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  async handleOffer(offer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection(this.iceServers);

      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socket.send(JSON.stringify({
            type: 'candidate',
            candidate: event.candidate
          }));
        }
      };

      this.peerConnection.ontrack = event => {
        this.remoteVideo.srcObject = event.streams[0];
      };

      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      }
    }

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.socket.send(JSON.stringify({
      type: 'answer',
      answer: this.peerConnection.localDescription
    }));
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async handleRemoteIceCandidate(candidate: RTCIceCandidateInit) {
    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error adding received ice candidate', error);
    }
  }
}
