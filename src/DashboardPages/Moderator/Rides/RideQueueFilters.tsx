import React from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Investigating", value: "investigating" },
  { label: "Resolved", value: "resolved" },
  { label: "Rejected", value: "rejected" },
];

const ASSIGNEE_OPTIONS = [
  { label: "Unassigned", value: "unassigned" },
  { label: "Assigned to me", value: "me" },
  { label: "Anyone", value: "" },
];

export function RideQueueFilters({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  return (
    <Card className="mb-3">
      <div className="grid md:grid-cols-6 gap-3">
        <div className="col-span-2">
          <MultiSelect
            options={STATUS_OPTIONS}
            value={value.status}
            onChange={(e) => onChange({ ...value, status: e.value, page: 1 })}
            display="chip"
            placeholder="Statuses"
            className="w-full"
          />
        </div>

        <Dropdown
          options={ASSIGNEE_OPTIONS}
          value={value.assignee}
          onChange={(e) => onChange({ ...value, assignee: e.value, page: 1 })}
          placeholder="Assignee"
          className="w-full"
        />

        <InputNumber
          value={value.minRisk}
          onValueChange={(e) => onChange({ ...value, minRisk: e.value ?? 0, page: 1 })}
          min={0}
          max={100}
          placeholder="Min risk"
          inputClassName="w-full"
          className="w-full"
        />

        <div className="flex items-center gap-2">
          <Checkbox
            inputId="hasEvidence"
            checked={value.hasEvidence === true}
            onChange={(e) =>
              onChange({
                ...value,
                hasEvidence: e.checked ? true : undefined,
                page: 1,
              })
            }
          />
          <label htmlFor="hasEvidence">With evidence only</label>
        </div>

        <InputText
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value, page: 1 })}
          placeholder="Search rideId / pickup / dropoff"
          className="w-full"
        />
      </div>
    </Card>
  );
}
