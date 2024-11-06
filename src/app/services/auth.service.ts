import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { connect, createLocalTracks, Room } from 'twilio-video';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  // Register user
  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendEmailVerification();
      return result;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  // Send email verification
  async sendEmailVerification(): Promise<void> {
    try {
      (await this.afAuth.currentUser)?.sendEmailVerification();
      console.log('Email verification sent');
    } catch (error) {
      console.error('Error sending email verification:', error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async sendVerificationCode(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier): Promise<any> {
    try {
      return await this.afAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
    } catch (error) {
      console.error('Error during sending verification code:', error);
      throw error;
    }
  }

  async verifyCode(verificationId: string, verificationCode: string): Promise<any> {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      return await this.afAuth.signInWithCredential(credential);
    } catch (error) {
      console.error('Error during code verification:', error);
      throw error;
    }
  }
  // customise db creation 

  // Create a new document in the specified collection
  createDoc(collection: string, data: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(collection).doc(id).set(data);
  }

  // Get a single document by ID from the specified collection
  getDoc(collection: string, id: string): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  // Get all documents from the specified collection
  getCollection(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  // Update a document in the specified collection
  updateDoc(collection: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  // Delete a document from the specified collection
  deleteDoc(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }

  // video callback

  //   private room: Room | null = null;

  // async joinRoom(token: string, roomName: string) {
  //   try {
  //     const localTracks = await createLocalTracks({
  //       audio: true,
  //       video: { width: 640 },
  //     });

  //     this.room = await connect(token, {
  //       name: roomName,
  //       tracks: localTracks,
  //     });

  //     return this.room;
  //   } catch (error) {
  //     console.error('Error joining room', error);
  //     throw error;
  //   }
  // }

  // leaveRoom() {
  //   if (this.room) {
  //     this.room.disconnect();
  //     this.room = null;
  //   }
  // }
}

