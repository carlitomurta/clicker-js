import { Utils } from "./utils";

const utils = new Utils();

/**
 * Elementos
 */
const elTics = document.getElementById("ticsValue");
const elButton = document.getElementById("clickButton");
const elTps = document.getElementById("tpsValue");

export class Game {
  public fps: number = 30; // FPS do game

  public tics: number = 0; // Tic é a moeda do jogo

  public clickValue: number = 1; // Valor por click
  public ticPerSecond: number = 10; // Tics por segundo

  constructor() {}

  /**
   * Inicializa o jogo
   */
  public initGame() {
    elTics.innerHTML = this.tics.toFixed(1);
    elTps.innerHTML = this.ticPerSecond.toFixed(1);
    elButton.addEventListener("click", (e) => {
      this.click();
    });
    setTimeout(() => {
      this.earnTicsPerSecond();
    }, 1000);
  }

  /**
   * Reload Frames
   */
  private update(f: any) {
    setInterval(() => {
      f;
    }, 1000 / this.fps);
  }

  /**
   * Evento do Click
   */
  public click() {
    this.tics += this.clickValue;
    elTics.innerHTML = this.tics.toFixed(1);
  }

  public earnTicsPerSecond() {
    setInterval(() => {
      if (this.tics !== undefined) {
        this.tics = utils.lerp(this.tics, this.tics + this.ticPerSecond, 0.032);
        elTics.innerHTML = this.tics.toFixed(1);
      }
    }, 1000 / this.fps);
  }
}
