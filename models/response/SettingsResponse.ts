import {AssignmentSettings} from "../../redux/settingsSlice/types";

export interface SettingsResponse {
    id: number,
    allow_file_attachment: boolean,
    max_file_size: number,
    max_files_attached: number,
    anonymous_status: boolean,
    assignment_settings: AssignmentSettings
}