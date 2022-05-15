import { BasicPolicy } from "~/types";
import { RenderEitherOr } from "~/utils/client";
import { PoliciesTable } from "./policiesTable";
import { PoliciesCards } from "./policiesCards";
import { useShowPoliciesTable } from "./showPoliciesTable.hook";

interface IPoliciesListProps {
  policies: Array<BasicPolicy>;
}

export function PoliciesList({ policies }: IPoliciesListProps): JSX.Element {
  const showPoliciesTable = useShowPoliciesTable();

  return (
    <RenderEitherOr
      ifTrue={showPoliciesTable}
      thenRender={<PoliciesTable policies={policies} />}
      otherwiseRender={<PoliciesCards policies={policies} />}
    />
  );
}
