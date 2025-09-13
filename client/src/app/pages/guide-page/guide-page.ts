import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ToggleSwitcher } from "@reusable/toggle-switcher/toggle-switcher";

@Component({
  selector: "app-guide-page",
  imports: [ToggleSwitcher,CommonModule],
  templateUrl: "./guide-page.html",
  styleUrl: "./guide-page.less",
})
export class GuidePage {
  englishVersion: string = 'eng';
  ukrainianVersion: string= 'ua';
  selectedLanguage: string = this.englishVersion;

  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
  }
}
