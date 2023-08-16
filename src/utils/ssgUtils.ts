export function convertToProps(obj: object) {
  return { props: obj };
}

export function createGetStaticProps(getMethods: (() => Promise<any>)[]) {
  return async () => {
    let responses = {};
    const rawResponses = await Promise.all(getMethods.map((meth) => meth()));
    rawResponses.forEach((rawResponse) => {
      responses = { ...responses, ...rawResponse };
    });
    return convertToProps(responses);
  };
}
