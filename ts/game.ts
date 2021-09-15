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
  public ticPerSecond: number = 0.1; // Tics por segundo

  constructor() {}

  /**
   * Inicializa o jogo
   */
  public initGame() {
    elTics.innerHTML = this.tics.toString();
    elTps.innerHTML = this.ticPerSecond.toString();
    elButton.addEventListener("click", (e) => {
      this.click();
    });
    this.update(this.earnTicsPerSecond);
  }

  /**
   * Reload Frames
   */
  private update(f: any) {
    setInterval(f, 1000 / this.fps);
  }

  /**
   * Evento do Click
   */
  public click() {
    this.tics += this.clickValue;
    elTics.innerHTML = this.tics.toFixed(0);
  }

  public earnTicsPerSecond() {
    this.tics = utils.lerp(this.tics, this.tics + this.ticPerSecond, 0.035);
    elTics.innerHTML = this.tics.toFixed(0);
  }
}
