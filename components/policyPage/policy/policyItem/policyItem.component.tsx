interface IPolicyItemProps {
  body: string;
  title: string;
}

export function PolicyItem({ body, title }: IPolicyItemProps): JSX.Element {
  return (
    <section className="flex flex-col gap-1 p-4 rounded-md shadow-md">
      <h2 className="font-light text-md">{title}</h2>
      <p className="font-thin text-2xl text-right">{body}</p>
    </section>
  );
}
