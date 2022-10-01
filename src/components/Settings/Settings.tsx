import React from "react";
import { settingsWrapperStyles } from "./Settings.style";
import SettingsForm from "./SettingsForm";

function Settings() {
  return (
    <section css={settingsWrapperStyles}>
      <div>
        <SettingsForm />
      </div>
    </section>
  );
}

export default Settings;
