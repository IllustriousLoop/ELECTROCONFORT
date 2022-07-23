import axios from "axios";

let apiUrl = "http://localhost:8000/api";

export const dateNormalizer = (params, name) =>
  params.row[name] ? new Date(params.row[name]).toLocaleDateString() : "";

export const fechaJavascript = (params, name) =>
  params[name] ? new Date(params[name]).getTime() : "";

export const arrayTodosLosDiasDeUnMes = (mes, año) => {
  const dias = new Date(año, mes, 0).getDate();
  const diasDelMes = [];
  for (let i = 1; i <= dias; i++) {
    diasDelMes.push(new Date(año, mes - 1, i));
  }
  console.log(diasDelMes);
  return diasDelMes;
};

export const columnsTarjetasR = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "Codigo  establec",
    headerName: "Terminal",
    width: 150,
  },
  {
    field: "Franquicia",
    headerName: "Franquicia",
    width: 150,
    type: "String",
  },
  {
    field: "Fecha de Abono",
    headerName: "Fecha de Abono",
    width: 200,
    type: "date",
    valueGetter: (params) => dateNormalizer(params, "Fecha de Abono"),
  },
  {
    field: "Fecha de proceso",
    headerName: "Fecha de proceso",
    width: 200,
    type: "String",
    valueGetter: (params) => dateNormalizer(params, "Fecha de proceso"),
    hide: true,
  },
  {
    field: "Tipo Transaccion",
    headerName: "Tipo Transaccion",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Compras",
    headerName: "Vlr Compras",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Iva",
    headerName: "Vlr Iva",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Propina",
    headerName: "Vlr Propina",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Total",
    headerName: "Vlr Total",
    width: 150,
    type: "number",
  },
  {
    field: "Valor Comision",
    headerName: "Valor Comision",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Rete Iva",
    headerName: "Vlr Rete Iva",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Vlr Rete Ica",
    headerName: "Vlr Rete Ica",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Valor Rte Fte",
    headerName: "Valor Rte Fte",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "Valor Abono",
    headerName: "Valor Abono",
    width: 150,
    type: "number",
  },
  {
    field: "Cuenta",
    headerName: "Cuenta",
    width: 150,
    type: "number",
    hide: true,
  },
  {
    field: "asociado",
    type: "string",
    headerName: "Asociados",
    width: 150,
    hide: true,
  },
];

export const columnsTarjetasCompleto = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "Comercio", type: "number", headerName: "Terminal", width: 120 },
  { field: "Franquicia", type: "string", headerName: "Franquicia", width: 150 },
  {
    field: "F abono",
    type: "date",
    headerName: "Fecha de Abono",
    width: 200,
    hide: true,
    valueGetter: (params) => dateNormalizer(params, "F abono"),
  },
  {
    field: "F vale",
    type: "date",
    headerName: "Fecha de Vale",
    width: 200,
    valueGetter: (params) => dateNormalizer(params, "F vale"),
  },
  {
    field: "F proceso",
    type: "date",
    headerName: "Fecha de Proceso",
    width: 200,
    valueGetter: (params) => dateNormalizer(params, "F proceso"),
    hide: true,
  },
  {
    field: "Tarjeta",
    type: "number",
    headerName: "Tarjeta",
    width: 150,
    hide: true,
  },
  {
    field: "Hora trans",
    type: "number",
    headerName: "Hora trans",
    width: 150,
    hide: true,
  },
  {
    field: "Comprobante",
    type: "number",
    headerName: "Comprobante",
    width: 150,
    hide: true,
  },
  { field: "Autorizacion", headerName: "Autorizacion", width: 150, hide: true },
  {
    field: "Terminal",
    type: "string",
    headerName: "Terminal Especi",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Compra",
    type: "number",
    headerName: "Vlr Compra",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Iva",
    type: "number",
    headerName: "Vlr Iva",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Propina",
    type: "number",
    headerName: "Vlr Propina",
    width: 150,
    hide: true,
  },
  { field: "Vlr Total", type: "number", headerName: "Vlr Total", width: 150 },
  {
    field: "Vlr Comision",
    type: "number",
    headerName: "Vlr Comision",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Rete Iva",
    type: "number",
    headerName: "Vlr Rete Iva",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Rete Ica",
    type: "number",
    headerName: "Vlr Rete Ica",
    width: 150,
    hide: true,
  },
  {
    field: "Vlr Rete Fuente",
    type: "number",
    headerName: "Vlr Rete Fuente",
    width: 150,
    hide: true,
  },
  { field: "Vlr Abono", type: "number", headerName: "Vlr Abono", width: 150 },
  {
    field: "T Tarjeta",
    type: "number",
    headerName: "T Tarjeta",
    width: 150,
    hide: true,
  },
  {
    field: "Cuenta",
    type: "number",
    headerName: "Cuenta",
    width: 150,
    hide: true,
  },
  {
    field: "Tipo Transaccion",
    type: "number",
    headerName: "Tipo Transaccion",
    width: 150,
    hide: true,
  },
];

export const columnsAuxiliar = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "COMPROBANTE",
    headerName: "Comprobante",
    width: 150,
    type: "string",
  },
  {
    field: "FECHA",
    headerName: "Fecha",
    width: 150,
    type: "date",
    valueGetter: (params) => dateNormalizer(params, "FECHA"),
  },
  {
    field: "DESCRIPCION",
    headerName: "Descripcion",
    width: 150,
    type: "string",
  },
  { field: "DEBITOS", headerName: "Debitos", width: 150, type: "number" },
  { field: "CREDITOS", headerName: "Creditos", width: 150, type: "number" },
  { field: "FRANQUICIA", headerName: "Franquicia", width: 150, type: "string" },
  {
    field: "FECHA VAOUCHER",
    headerName: "Fecha Voucher",
    width: 150,
    type: "date",
    valueGetter: (params) => dateNormalizer(params, "FECHA VAOUCHER"),
  },
  { field: "TERMINAL", headerName: "Terminal", width: 150 },
];
export const columnsExtracto = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "FECHA",
    headerName: "Fecha",
    width: 150,
    type: "date",
    valueGetter: (params) => dateNormalizer(params, "FECHA"),
  },
  {
    field: "DESCRIPCION",
    headerName: "Descripcion",
    width: 150,
    type: "string",
  },
  { field: "TERMINAL", headerName: "Terminal", width: 150, type: "number" },
  { field: "DEBITO", headerName: "Debito", width: 150, type: "number" },
  { field: "CREDITO", headerName: "Credito", width: 150, type: "number" },
  { field: "TIPO", headerName: "Tipo", width: 150, type: "string" },
];

const terminales = [15969009, 15969017, 15969066, 15969082, 15969090];
const franquicias = ["DCN", "MNS", "VNS"];
const transacciones = [6, 26, 420, 78];

export const findAsociados = (api,ext = [], month = 1) => {
  const mes = arrayTodosLosDiasDeUnMes(month, 2022);
  terminales.forEach((terminal) => {
    const filtTer = ext.filter(
      (extracto) => extracto["Codigo  establec"] === terminal
    );
    franquicias.forEach((franquicia) => {
      const filtFran = filtTer.filter(
        (extracto) => extracto["Franquicia"] === franquicia
      );
      mes.forEach((dia) => {
        const filtDia = filtFran.filter(
          (extracto) =>
            fechaJavascript(extracto, "Fecha de Abono") === dia.getTime()
        );
        transacciones.forEach((transaccion) => {
          const filtTrans = filtDia.filter(
            (extracto) => extracto["Tipo Transaccion"] === transaccion
          );

          filtTrans.forEach((extracto) => {
            axios
              .get(
                `${api}/tarjetascompleto/specific/${terminal}/${franquicia}/${dia.getTime()}/${transaccion}/?MES=${month}`
              )
              .then((res) => {
                const data = res.data;

                let suma = 0;
                if (data.length === 1) {
                  suma = res.data[0]["Vlr Abono"];
                } else {
                  data.forEach((auxiliar) => (suma += auxiliar["Vlr Abono"]));
                }
                if (suma !== extracto["Valor Abono"]) {
                  console.log(
                    "Error en :",
                    `${terminal}-${franquicia}-${dia.toLocaleDateString()}-${transaccion} con:`,
                    extracto,
                    data,
                    "y",
                    suma
                  );
                } else {
                  let ids = [];
                  data.forEach((ex) => {
                    ids.push(ex["id"]);
                  });
                  axios
                    .put(`${api}/tarjetasr/${extracto.id}?MES=${mes}`, {
                      asociado: ids,
                    })
                    .then((res) => {
                      console.log("Exitoso");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      });
    });
  });
  console.log("Terminado");
};

const gastosBancarios = (data, mes) => {
  const h = data.filter(
    (row) =>
      row["DESCRIPCION"].startsWith("Cobro ") ||
      row["DESCRIPCION"].includes("Gravamen ") ||
      (row["DESCRIPCION"].includes("IVA ") && row["CREDITO"] === 0)
  );
  console.log(h);
  h.forEach((row) => {
    axios
      .put(`${apiUrl}/extracto/${row.id}/?MES=${mes}`, {
        TIPO: ["gasto"],
      })
      .then((res) => {
        console.log("Exitoso");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return h;
};

const tarjetas = (data, mes) => {
  const h = data.filter(
    (row) =>
      row["DESCRIPCION"].startsWith("Nc Master") ||
      row["DESCRIPCION"].startsWith("Nd Master") ||
      row["DESCRIPCION"].startsWith("Nc Visa") ||
      row["DESCRIPCION"].startsWith("Nd Visa") ||
      row["DESCRIPCION"].startsWith("Nc Diners") ||
      row["DESCRIPCION"].startsWith("Nc Diners")
  );

  h.forEach((row) => {
    axios
      .put(`${apiUrl}/extracto/${row.id}/?MES=${mes}`, {
        TIPO: "tarjeta",
      })
      .then((res) => {
        console.log("Exitoso");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return h;
};
const creditos = (data, mes) => {
  const h = data.filter(
    (row) => row["DEBITO"] !== 0 && row["TIPO"].length === 0
  );
  console.log("inicio");
  axios
    .get(`${apiUrl}/auxiliar/all/CREDITOS/?MES=${mes}`)
    .then((res) => {
      const dataAux = res.data;
      h.forEach((ext) => {
        dataAux.forEach((aux) => {
          if (ext["DEBITO"] === aux["CREDITOS"]) {
            axios
              .put(`${apiUrl}/extracto/${ext.id}/?MES=${mes}`, {
                TIPO: "credito",
                // asociado: aux.id,
              })
              .then(() => {
                console.log("asociado", ext["DEBITO"], aux["CREDITOS"], ext.id);
              })
              .catch((err) => {
                console.log(ext.id, aux.id, err);
              });
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const removeDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const debitos = (data, mes) => {
  const h = data.filter(
    (row) => row["CREDITO"] !== 0 && row["TIPO"].length === 0
  );
  console.log("inicio debitos");
  axios
    .get(`${apiUrl}/auxiliar/all/DEBITOS/?MES=${mes}`)
    .then((res) => {
      const dataAux = res.data;
      h.forEach((ext) => {
        dataAux.forEach((aux) => {
          const updateExtract = () => {
            axios
              .put(`${apiUrl}/extracto/${ext.id}/?MES=${mes}`, {
                TIPO: "debitos",
                // asociado: aux.id,
              })
              .then(() => {
                console.log("update", ext["CREDITO"], aux["DEBITOS"], ext.id);
              })
              .catch((err) => {
                console.log(ext.id, aux.id, err);
              });
          };
          if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            ext["FECHA"] === aux["FECHA"]
          ) {
            updateExtract();
          }
          if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            new Date(ext["FECHA"]).getTime() ===
              addDays(aux["FECHA"], 1).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            addDays(ext["FECHA"], 1).getTime() ==
              new Date(aux["FECHA"]).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            new Date(ext["FECHA"]).getTime() ===
              removeDays(aux["FECHA"], 1).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            removeDays(ext["FECHA"], 1).getTime() ==
              new Date(aux["FECHA"]).getTime()
          ) {
            updateExtract();
          }

          if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            new Date(ext["FECHA"]).getTime() ===
              addDays(aux["FECHA"], 2).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            addDays(ext["FECHA"], 2).getTime() ==
              new Date(aux["FECHA"]).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            new Date(ext["FECHA"]).getTime() ===
              removeDays(aux["FECHA"], 2).getTime()
          ) {
            updateExtract();
          } else if (
            ext["CREDITO"] === aux["DEBITOS"] &&
            removeDays(ext["FECHA"], 2).getTime() ==
              new Date(aux["FECHA"]).getTime()
          ) {
            updateExtract();
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const conciliacion = (api, data, mes) => {
  apiUrl = api;
  gastosBancarios(data, mes);
  tarjetas(data, mes);
  creditos(data, mes);
  debitos(data, mes);
};
