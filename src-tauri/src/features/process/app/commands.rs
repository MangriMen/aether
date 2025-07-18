use aether_core::features::process::MinecraftProcessMetadata;

use crate::FrontendResult;

pub fn init<R: tauri::Runtime>() -> tauri::plugin::TauriPlugin<R> {
    tauri::plugin::Builder::new("process")
        .invoke_handler(tauri::generate_handler![
            process_list,
            process_get_by_instance_id
        ])
        .build()
}

#[tauri::command]
pub async fn process_list() -> FrontendResult<Vec<MinecraftProcessMetadata>> {
    Ok(aether_core::api::process::list().await?)
}

#[tauri::command]
pub async fn process_get_by_instance_id(
    id: String,
) -> FrontendResult<Vec<MinecraftProcessMetadata>> {
    Ok(aether_core::api::process::get_by_instance_id(id).await?)
}
