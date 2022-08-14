export default interface summaryCard {
  id: string;
  MES: number;
  "Codigo  establec": number;
  Cuenta: number;
  Franquicia: string;
  "Fecha de proceso": string;
  "Fecha de Abono": string;
  "Tipo Transaccion": number;
  "Vlr Compras": number;
  "Vlr Iva": number;
  "Vlr Propina": number;
  "Vlr Total": number;
  "Valor Comision": number;
  "Vlr Rete Iva": number;
  "Vlr Rete Ica": number;
  "Valor Rte Fte": number;
  "Valor Abono": number;
  asociado: string[];
}
export type summaryCardData = {
  key: string;
} & summaryCard;
