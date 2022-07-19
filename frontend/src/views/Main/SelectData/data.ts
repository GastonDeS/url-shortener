export interface TagOptions {
    readonly value: string;
    readonly label: string;
  }


  export const createOptions = (data: string[]) => {
    let options :TagOptions[] = [];
    data.forEach((el:string) => {
      options.push({value: el, label: el})
    })
    return options;
  }
