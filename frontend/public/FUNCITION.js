import axios from "axios";


const tarjetas = (data) => {
  const h = data.filter(({ descripcion }) => descripcion.includes("FINAN T"));
  h.forEach((row) => {
    axios.put(`http://localhost:8080/api/extracto/${row.id}`, {
      tipo: "tarjeta",
    });
  });
  return h;
};
const creditos = (data) => {
  const h = data.filter(({ valor, tipo }) => valor < 0 && tipo === "null");
  console.log("inicio");
  axios
    .get("http://localhost:8080/api/auxiliar/all/credito")
    .then((res) => {
      const dataAux = res.data;
      h.forEach((ext) => {
        dataAux.forEach((aux) => {
          if (ext.valor * -1 === aux.credito) {
            axios
              .put(`http://localhost:8080/api/extracto/${ext.id}`, {
                tipo: "credito",
                asociado: aux.id,
              })
              .then(() => {
                console.log("asociado", ext.valor, aux.credito, ext.id);
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

const debitos = (data) => {
  const h = data.filter(({ valor, tipo }) => valor > 0 && tipo === "null");
  console.log("inicio debitos");
  axios
    .get("http://localhost:8080/api/auxiliar/all/debito")
    .then((res) => {
      const dataAux = res.data;
      h.forEach((ext) => {
        dataAux.forEach((aux) => {
          const updateExtract = () => {
            axios
              .put(`http://localhost:8080/api/extracto/${ext.id}`, {
                tipo: "debitos",
                asociado: aux.id,
              })
              .then(() => {
                console.log("asociado");
              })
              .catch((err) => {
                console.log(ext.id, aux.id, err);
              });
          };
          if (ext.valor === aux.debito && ext.fecha === aux.fecha) {
            updateExtract();
          }
          if (
            ext.valor === aux.debito &&
            new Date(ext.fecha).getTime() === addDays(aux.fecha, 1).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            addDays(ext.fecha, 1).getTime() == new Date(aux.fecha).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            new Date(ext.fecha).getTime() === removeDays(aux.fecha, 1).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            removeDays(ext.fecha, 1).getTime() == new Date(aux.fecha).getTime()
          ) {
            updateExtract();
          }

          if (
            ext.valor === aux.debito &&
            new Date(ext.fecha).getTime() === addDays(aux.fecha, 2).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            addDays(ext.fecha, 2).getTime() == new Date(aux.fecha).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            new Date(ext.fecha).getTime() === removeDays(aux.fecha, 2).getTime()
          ) {
            updateExtract();
          } else if (
            ext.valor === aux.debito &&
            removeDays(ext.fecha, 2).getTime() == new Date(aux.fecha).getTime()
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

//mongoimport --db ELECTROCONFORT --collection extractos --type=csv --headerline --file=extr.csv && mongoimport --db ELECTROCONFORT --collection auxiliars --type=csv --headerline --file=auxi.csv && mongoimport --db ELECTROCONFORT --collection tarjetascompletos --type=csv --headerline --file=dheh.csv && mongoimport --db ELECTROCONFORT --collection tarjetasrs --type=csv --headerline --file=cn01.csv

