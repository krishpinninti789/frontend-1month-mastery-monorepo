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
