import { SettingsResponse } from "../models/response/SettingsResponse";

export const getSettings = (): SettingsResponse => {
  try {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        id: 1,
        allow_file_attachment: false,
        max_file_size: 1024,
        max_files_attached: 7,
        anonymous_status: false,
      }
    );
  } catch (e) {
    return {
      id: 1,
      allow_file_attachment: false,
      max_file_size: 1024,
      max_files_attached: 7,
      anonymous_status: false,
    };
  }
};
