type MetaInput = {
  title: string;
  description: string;
};

export const generateMetaData = ({ title, description }: MetaInput) => {
  return {
    title,
    description,
  };
};

// utils/debounce.js

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500,
) {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
