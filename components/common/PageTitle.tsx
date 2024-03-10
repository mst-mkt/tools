type TitleProps = {
  title: string;
};

export const PageTitle = ({ title }: TitleProps) => {
  return (
    <h2 class="font-bold flex items-center gap-x-4 my-2">
      {title}
      <span class="flex-grow block bg-neutral-500 h-0.5 rounded" />
    </h2>
  );
};
