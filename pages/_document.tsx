import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full w-full flex flex-col">
      <Head />
      <body className="flex flex-col grow">
        <main className="bg-slate-50 flex flex-col grow p-4">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
