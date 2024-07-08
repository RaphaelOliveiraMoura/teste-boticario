export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR");
};

export const formatDateIso = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month, day).toISOString();
};
