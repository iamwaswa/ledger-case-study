import type { ChangeEvent } from "react";
import { strings } from "~/localization";
import type { OrUndefined } from "~/types";
import { RenderList } from "~/utils/client";

interface IPoliciesFilterProps<PolicyFilterOption> {
  label: string;
  policyFilterOptions: Array<PolicyFilterOption>;
  value: OrUndefined<string>;
  onPolicyFilterChanged(value: OrUndefined<string>): void;
  renderPolicyFilterOption(
    item: PolicyFilterOption,
    index: number,
    items: Array<PolicyFilterOption>
  ): JSX.Element;
}

export function PoliciesFilter<PolicyFilterOption>({
  label,
  policyFilterOptions,
  value,
  onPolicyFilterChanged,
  renderPolicyFilterOption,
}: IPoliciesFilterProps<PolicyFilterOption>) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onPolicyFilterChanged(event.target.value || undefined);
  }

  return (
    <label className="flex flex-col">
      <span className="font-bold">{label}</span>
      <select
        className="border border-slate-800 rounded-sm cursor-pointer"
        value={value ?? ``}
        onChange={handleChange}
      >
        <option value="">{strings.emptySelectOptionLabel}</option>
        <RenderList
          items={policyFilterOptions}
          renderItem={renderPolicyFilterOption}
        />
      </select>
    </label>
  );
}
