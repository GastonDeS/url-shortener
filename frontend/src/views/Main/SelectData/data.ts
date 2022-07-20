export interface Options {
  readonly value: string;
  readonly label: string;
}


export const createOptions = (data: string[]) => {
  let options: Options[] = [];
  data.forEach((el: string) => {
    options.push({ value: el, label: el })
  })
  return options;
}

