/**
 * Elementos
 */
const elTics = document.getElementById("ticsValue");
const elButton = document.getElementById("clickButton");

export class Game {
  public _tics: number = 0; // Tic é a moeda do jogo

  public _clickValue: number = 1; // Valor por click
  public _ticPerSecond: number = 0; // Tics por segundo

  constructor() {}

  /**
   * Inicializa o jogo
   */
  public initGame() {
    elTics.innerHTML = this._tics.toString();
    elButton.addEventListener("click", (e) => {
      this.click();
      console.log(this._tics);
    });
  }

  /**
   * Evento do Click
   */
  public click() {
    this._tics += this._clickValue;
    elTics.innerHTML = this._tics.toString();
    console.log(this._tics);
  }
}
