import { BasicPolicy } from "~/types";
import { RenderList } from "~/utils/client";
import { PolicyCard } from "./policyCard";

interface IPoliciesCardsProps {
  policies: Array<BasicPolicy>;
}

export function PoliciesCards({ policies }: IPoliciesCardsProps): JSX.Element {
  return (
    <section className="flex flex-col gap-4">
      <RenderList
        items={policies}
        renderItem={(policy) => {
          return <PolicyCard key={policy.row} policy={policy} />;
        }}
      />
    </section>
  );
}
