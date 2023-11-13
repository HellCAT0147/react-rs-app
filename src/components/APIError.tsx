interface ErrorProps {
  msg: string;
}

export default function APIError({ msg }: ErrorProps): JSX.Element {
  return (
    <section className="api">
      <h2>{msg}</h2>
    </section>
  );
}
