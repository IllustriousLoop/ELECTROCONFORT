export const dateNormalizer = (param: string) => {
  return param ? new Date(param).toLocaleDateString() : "";
};
