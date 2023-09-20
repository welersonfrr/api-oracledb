export class Order {
  constructor(
    public FILIAL: string,
    public OP: string,
    public CODIGO: string,
    public CODBEL: string,
    public PRODUTO: string,
    public QTDPAD: string,
    public LOTE: string,
    public DTVALIDADE: string
  ) {
    this.FILIAL;
    this.OP;
    this.CODIGO;
    this.CODBEL;
    this.PRODUTO;
    this.QTDPAD;
    this.LOTE;
    this.DTVALIDADE;
  }
}
