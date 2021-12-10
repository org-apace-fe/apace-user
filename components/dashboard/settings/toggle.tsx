import { useState } from "react";
import { Switch } from "@headlessui/react";

function MyToggle({ enabled, onChange, name }: any) {
  // const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      name={name}
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? "bg-green-600" : "bg-gray-200"
      } relative inline-flex items-center h-5 rounded-full w-10`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}

export default MyToggle;
