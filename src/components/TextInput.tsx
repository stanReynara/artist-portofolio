import React from "react";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
};

export function TextInput({ label, placeholder, type = "text" }: Props) {
  return (
    <fieldset className="fieldset font-sans w-full">
      <legend className="fieldset-legend text-neutral text-2xl font-sans">
        {label}
      </legend>

      {type === "textarea" ? (
        <textarea
          className="textarea h-24 text-neutral text-lg font-sans w-full"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          className="input text-neutral text-lg font-sans w-full"
          placeholder={placeholder}
        />
      )}
    </fieldset>
  );
}
