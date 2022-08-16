export default interface auxiliary {
  id: string;
  MES: number;
  COMPROBANTE: string;
  FECHA: string;
  DESCRIPCION: string;
  DEBITOS: number;
  CREDITOS: number;
  FRANQUICIA: string;
  "FECHA VAOUCHER": string;
  TERMINAL: number;
  ASOCIADO: string[];
}
export type auxiliaryData = {
  key: string;
} & auxiliary;
