import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DinamicLoaderService {
  constructor() {}

  // Method to dynamically load a module/file
  async loadModule(modulePath: string) {
    try {
      // Use dynamic import() syntax
      const module = await import(modulePath);
      console.log("Module loaded dynamically:", module);
      return module;
    } catch (error) {
      console.error("Error loading module dynamically:", error);
      throw error;
    }
  }
}
