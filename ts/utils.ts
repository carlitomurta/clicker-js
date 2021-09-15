export class Utils {
  constructor() {}

  public lerp(x: number, y: number, a: number): number {
    return x * (1 - a) + y * a;
  }
}
