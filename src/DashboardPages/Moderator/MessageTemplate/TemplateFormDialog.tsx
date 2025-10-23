import React, { useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { MessageTemplate } from "./types";
import { renderString } from "../../../lib/render";


type Props = {
  visible: boolean;
  template?: MessageTemplate | null;
  onHide: () => void;
  onSubmit: (payload: any) => Promise<void> | void;
};

export const TemplateFormDialog: React.FC<Props> = ({ visible, template, onHide, onSubmit }) => {
  const edit = !!template;
  const [key, setKey] = useState(template?.key ?? "");
  const [title, setTitle] = useState(template?.title ?? "");
  const [category, setCategory] = useState<string>(template?.category ?? "dispute");
  const [folder, setFolder] = useState<string>(template?.folder ?? "");
  const [pinned, setPinned] = useState<boolean>(template?.pinned ?? false);
  const [variables, setVariables] = useState<string[]>(template?.variables ?? ["firstName","rideId","appealLink"]);
  const [subject, setSubject] = useState(template?.currentVersion.subject ?? "");
  const [body, setBody] = useState(template?.currentVersion.body ?? "");
  const [notes, setNotes] = useState("");

  const [sampleData, setSampleData] = useState<Record<string, any>>({
    firstName: "Rahim", rideId: "RIDE-1293", appealLink: "https://app/appeal/1293"
  });

  useEffect(() => {
    if (!visible) return;
    if (template) {
      setKey(template.key); setTitle(template.title); setCategory(template.category);
      setFolder(template.folder || ""); setPinned(template.pinned);
      setVariables(template.variables || []); setSubject(template.currentVersion.subject || "");
      setBody(template.currentVersion.body || ""); setNotes("");
    } else {
      setKey(""); setTitle(""); setCategory("dispute"); setFolder(""); setPinned(false);
      setVariables(["firstName","rideId","appealLink"]); setSubject(""); setBody(""); setNotes("");
    }
  }, [visible, template]);

  const preview = useMemo(() => ({
    subject: renderString(subject, sampleData),
    body: renderString(body, sampleData)
  }), [subject, body, sampleData]);

  return (
    <Dialog header={edit ? "Edit Template" : "New Template"} visible={visible} style={{ width: "900px" }} modal onHide={onHide}
      footer={<div className="flex justify-end gap-2">
        <Button label="Cancel" text onClick={onHide} />
        <Button label={edit ? "Save" : "Create"} onClick={() => onSubmit({
          ...(edit ? {} : { key }),
          title, category, folder, pinned, variables, subject, body, notes
        })} />
      </div>}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {!edit && (
            <span className="p-float-label">
              <InputText id="key" value={key} onChange={(e)=>setKey(e.target.value)} />
              <label htmlFor="key">Key (unique)</label>
            </span>
          )}
          <span className="p-float-label">
            <InputText id="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label htmlFor="title">Title</label>
          </span>
          <Dropdown value={category} onChange={(e)=>setCategory(e.value)} options={["report","dispute","verification"]} placeholder="Category" />
          <span className="p-float-label">
            <InputText id="folder" value={folder} onChange={(e)=>setFolder(e.target.value)} />
            <label htmlFor="folder">Folder</label>
          </span>
          <div className="flex items-center gap-2">
            <Button icon={pinned ? "pi pi-star-fill" : "pi pi-star"} text onClick={()=>setPinned(p=>!p)} label={pinned ? "Pinned" : "Pin"} />
          </div>
          <div>
            <label className="block mb-2">Variables</label>
            <Chips value={variables} onChange={(e)=>setVariables(e.value)} separator="," />
            <small className="block mt-1 opacity-70">e.g., firstName, rideId, appealLink</small>
          </div>
          <div>
            <label className="block mb-2">Subject</label>
            <InputText value={subject} onChange={(e)=>setSubject(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Body</label>
            <InputTextarea autoResize rows={8} value={body} onChange={(e)=>setBody(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Version notes</label>
            <InputText value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="What changed & why" />
          </div>
        </div>

        {/* Live Preview + Sample Data */}
        <div className="flex flex-col gap-3">
          <div className="p-3 border rounded">
            <div className="font-semibold mb-2">Sample Data</div>
            {variables.map(v => (
              <div key={v} className="flex items-center gap-2 mb-2">
                <label className="w-36 text-sm opacity-80">{v}</label>
                <InputText value={sampleData[v] ?? ""} onChange={(e)=>{
                  setSampleData(sd => ({ ...sd, [v]: e.target.value }));
                }} />
              </div>
            ))}
          </div>
          <div className="p-3 border rounded">
            <div className="font-semibold mb-2">Preview</div>
            <div className="text-sm mb-2"><strong>Subject:</strong> {preview.subject}</div>
            <pre className="text-sm whitespace-pre-wrap p-2 bg-surface-100 rounded">{preview.body}</pre>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
