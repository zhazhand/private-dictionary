import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { routePath } from "@constants/constants";

@Component({
  selector: "app-item-form",
  imports: [],
  templateUrl: "./item-form.html",
  styleUrl: "./item-form.less",
})
export class ItemForm implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  isNew!: boolean;
  isIrregular!: boolean;

  ngOnInit() {
    this.isNew =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path ===
      routePath.new;
    this.isIrregular =
      this.route.snapshot.url[this.route.snapshot.url.length - 2].path ===
      routePath.irregular;
  }

  goBack(): void {
    this.location.back();
  }
}
