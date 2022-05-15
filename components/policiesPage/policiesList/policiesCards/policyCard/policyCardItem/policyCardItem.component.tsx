interface IPolicyItemProps {
  body: string;
  title: string;
}

export function PolicyCardItem({ body, title }: IPolicyItemProps): JSX.Element {
  return (
    <section className="flex flex-col">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="text-slate-700">{body}</p>
    </section>
  );
}
