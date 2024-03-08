import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AudioRecorderService{
    mediaRecorder: MediaRecorder | null = null;
    chunks: Blob[] = [];
    isRecording$ = new BehaviorSubject(false);
    audioURL: string | null = null;

    init() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = (event) => {
                    this.chunks.push(event.data);
                };
                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
                    this.chunks = [];
                    this.audioURL = window.URL.createObjectURL(blob);
                };
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    }

    startRecording() {
        if (this.mediaRecorder && this.isRecording$.getValue() === false) {
            this.mediaRecorder.start();
            this.isRecording$.next(true);
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording$.getValue() === true) {
            this.mediaRecorder.stop();
            this.isRecording$.next(false);
        }
    }
}
