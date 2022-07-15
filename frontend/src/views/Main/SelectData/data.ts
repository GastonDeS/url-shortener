export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'tag1', label: 'tag1', color: '#00B8D9' },
    { value: 'tag2', label: 'tag2', color: '#0052CC' },
    { value: 'tag3', label: 'tag3', color: '#19A8A1'},
    { value: 'tag4', label: 'tag4', color: '#DA53BB' },
  ];