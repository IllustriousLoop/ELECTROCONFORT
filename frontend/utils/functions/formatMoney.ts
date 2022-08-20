import numeral from "numeral";

const formatMoney = (text: string) => numeral(text).format("$ 0,0");

export default formatMoney;
