type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h2 class="text-xl">{title}</h2>;
};
