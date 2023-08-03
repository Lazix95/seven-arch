export function convertFormDataToObject(formData: FormData) {
  return [...formData.entries()].reduce((acc, entery) => ({ [entery[0]]: entery[1] }), {});
}
