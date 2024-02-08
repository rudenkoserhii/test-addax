type Task = {
  id?: string;
  date?: Date;
  title: string;
  content?: string;
  label?: {
    color?: string;
    text?: string;
  }[];
};

export { type Task };
