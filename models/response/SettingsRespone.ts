export interface SettingsRespone {
    id?: number;
    allow_file_attachment?: boolean;
    max_file_size?: number;
    max_files_attached?: number;
    allowed_files_attached?: number;
    anonymous_status?: boolean;
}