import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full w-full flex flex-col">
      <Head />
      <body className="flex flex-col grow">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
