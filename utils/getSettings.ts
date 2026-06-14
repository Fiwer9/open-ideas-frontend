import { SettingsResponse } from "../models/response/SettingsResponse";
import { AssignmentSettings } from "../redux/settingsSlice/types";

export const getSettings = (): SettingsResponse => {
  try {
    const storedSettings = localStorage.getItem("settings");
    return (
      (storedSettings ? JSON.parse(storedSettings) : null) || {
        id: 1,
        allow_file_attachment: false,
        max_file_size: 1024,
        max_files_attached: 7,
        anonymous_status: false,
        assignment_settings: AssignmentSettings.MANUAL,
      }
    );
  } catch (e) {
    return {
      id: 1,
      allow_file_attachment: false,
      max_file_size: 1024,
      max_files_attached: 7,
      anonymous_status: false,
      assignment_settings: AssignmentSettings.MANUAL,
    };
  }
};
