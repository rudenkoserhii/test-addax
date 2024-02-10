type Task = {
  id?: string;
  date?: string;
  title: string;
  content?: string;
  label?: {
    id?: string;
    color?: string;
    text?: string;
    order: number;
  }[];
  order: number;
};

export { type Task };
