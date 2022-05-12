import { useGetPolicy } from "~/hooks";
import { strings } from "~/localization";
import { RenderAsyncData } from "~/utils/client";

interface IPolicyProps {
  policyRow: number;
}

export function Policy({ policyRow }: IPolicyProps) {
  const { data, error, loading } = useGetPolicy(policyRow);

  return (
    <RenderAsyncData
      data={data}
      error={error}
      loading={loading}
      renderData={({ policy }) => {
        return <pre>{JSON.stringify(policy, null, 2)}</pre>;
      }}
      renderError={({ message }) => {
        return <p className="text-red-500">{message}</p>;
      }}
      renderLoading={<p>{strings.policyLoadingMessage}</p>}
    />
  );
}
