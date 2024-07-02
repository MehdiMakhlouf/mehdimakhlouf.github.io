import {Injectable, Signal} from '@angular/core';
import {from, Observable} from "rxjs";
import imageCompression from "browser-image-compression";

@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {

  fileCompressor$(file:File, image: HTMLImageElement, compression: number): Observable<Blob> {
    return from(imageCompression(file, {
      maxSizeMB: file.size*compression/100/1024/1024
    }));
  }
  fileCompressor2$(file:File, image:HTMLImageElement, compression: number): Observable<Blob>{
    const canvas = document.createElement("canvas");
    const width = image.width*compression/100;
    const height = image.height*compression/100;
    canvas.width = image.width;
    canvas.height = image.height
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, image.width, image.height);
    return new Observable<Blob>((subscriber)=>
      canvas.toBlob(
        (blob) => {
          if(blob){
            subscriber.next(blob);
          }
          subscriber.complete();
        },)
  );
  }
}
