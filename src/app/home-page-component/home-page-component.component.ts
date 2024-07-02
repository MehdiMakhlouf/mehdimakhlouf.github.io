import {ChangeDetectorRef, Component, DestroyRef, inject, signal, WritableSignal} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ImageCompressionService} from "../services/image-compression.service";
import {first} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [
    MatIconModule,
    MatButton,
    NgIf,
    MatSlider,
    MatSliderThumb,
    MatCardContent,
    MatCard
  ],
  templateUrl: './home-page-component.component.html',
  styleUrl: './home-page-component.component.scss'
})
export class HomePageComponentComponent {
  originalImage: HTMLImageElement | null = null;
  originalFile: File | null = null;
  originalWeight = 0;
  compressionWeight = 0;
  originalFileUrl: string | null = null;
  compressionFileUrl: string | null = null;
  compression = 50;

  private imageCompressionService = inject(ImageCompressionService);
  private destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);


  fileChange(event: Event) {
    const element = event?.currentTarget as HTMLInputElement;
    if (!element?.files?.length) {
      return;
    }
    const file = element.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      this.originalImage = img;
      this.originalFile = file;
      this.originalFileUrl = window.URL.createObjectURL(file);
      this.originalWeight = file.size
      this.renderCompression(file, img, this.compression);
    };
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }

  compressionChange(compression: number) {
    this.compression = compression;
    if (!this.originalImage || !this.originalFile) {
      return;
    }
    this.renderCompression(this.originalFile, this.originalImage, this.compression);
  }

  renderCompression(file: File, img: HTMLImageElement, compression: number) {
    if (this.compressionFileUrl != null) {
      window.URL.revokeObjectURL(this.compressionFileUrl);
    }
    this.compressionFileUrl=null;
    this.imageCompressionService.fileCompressor$(file, img, this.compression).pipe(takeUntilDestroyed(this.destroyRef), first()).subscribe(
      blob => {
        this.compressionFileUrl = window.URL.createObjectURL(blob);
        this.compressionWeight = blob.size;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
