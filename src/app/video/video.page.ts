import { Component, ElementRef, OnInit } from '@angular/core';
import { RTCPeerService } from '../socket/socket.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage {

  topVideoFrame = 'partner-video';
  userId!: string;
  partnerId!: string;
  myEl!: HTMLMediaElement;
  partnerEl!: HTMLMediaElement;

  constructor(
    public webRTC: RTCPeerService,
    public elementRef: ElementRef
  ) { }

  init() {
    this.myEl = this.elementRef.nativeElement.querySelector('#my-video');
    this.partnerEl = this.elementRef.nativeElement.querySelector('#partner-video');
    this.webRTC.init(this.userId, this.myEl, this.partnerEl);
  }

  call() {
    this.webRTC.call(this.partnerId);
    this.swapVideo('my-video');
  }

  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }
}
