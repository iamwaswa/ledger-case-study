import Head from "next/head";
import { useRouter } from "next/router";
import { strings } from "~/localization";
import { RenderEitherOr } from "~/utils/client";
import { Policy } from "./policy";

export function PolicyPage() {
  const { isReady, query } = useRouter();

  return (
    <>
      <Head>
        <meta content={strings.policyPageDescription} name="description" />
      </Head>
      <main className="bg-slate-50">
        <RenderEitherOr
          ifTrue={isReady}
          thenRender={
            <RenderEitherOr
              ifTrue={
                typeof query?.policyRow === `string` &&
                Number(query.policyRow) > 0 &&
                Number(query.policyRow)
              }
              thenRender={(policyRow) => {
                return (
                  <>
                    <h1 className="text-xl">
                      {strings.formatString(strings.policyPageTitle, policyRow)}
                    </h1>
                    <Policy policyRow={policyRow} />
                  </>
                );
              }}
              otherwiseRender={
                <p className="text-red-500">
                  {strings.policyPageInvalidRowErrorMessage}
                </p>
              }
            />
          }
          otherwiseRender={<h1>{strings.policyPageLoadingMessage}</h1>}
        />
      </main>
    </>
  );
}
