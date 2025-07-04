use aether_core::core::LauncherState;
use aether_core::features::plugins::{EditPluginSettings, PluginDto, PluginSettings};

use crate::shared::file::reveal_in_explorer;
use crate::FrontendResult;

pub fn init<R: tauri::Runtime>() -> tauri::plugin::TauriPlugin<R> {
    tauri::plugin::Builder::new("plugin")
        .invoke_handler(tauri::generate_handler![
            sync_plugins,
            list_plugins,
            plugin_get,
            enable_plugin,
            disable_plugin,
            call_plugin,
            plugin_get_settings,
            plugin_edit_settings,
            open_plugins_folder,
        ])
        .build()
}

#[tauri::command]
pub async fn sync_plugins() -> FrontendResult<()> {
    Ok(aether_core::api::plugin::sync().await?)
}

#[tauri::command]
pub async fn list_plugins() -> FrontendResult<Vec<PluginDto>> {
    Ok(aether_core::api::plugin::list().await?)
}

#[tauri::command]
pub async fn plugin_get(id: String) -> FrontendResult<PluginDto> {
    Ok(aether_core::api::plugin::get(id).await?)
}

#[tauri::command]
pub async fn enable_plugin(id: String) -> FrontendResult<()> {
    Ok(aether_core::api::plugin::enable(id).await?)
}

#[tauri::command]
pub async fn disable_plugin(id: String) -> FrontendResult<()> {
    Ok(aether_core::api::plugin::disable(id).await?)
}

#[tauri::command]
pub async fn call_plugin(id: String, data: String) -> FrontendResult<()> {
    Ok(aether_core::api::plugin::call(id, data).await?)
}

#[tauri::command]
pub async fn plugin_get_settings(id: String) -> FrontendResult<Option<PluginSettings>> {
    Ok(aether_core::api::plugin::get_settings(id).await?)
}

#[tauri::command]
pub async fn plugin_edit_settings(id: String, settings: EditPluginSettings) -> FrontendResult<()> {
    Ok(aether_core::api::plugin::edit_settings(id, settings).await?)
}

#[tauri::command]
pub async fn open_plugins_folder() -> FrontendResult<()> {
    let state = LauncherState::get().await?;
    Ok(reveal_in_explorer(
        &state.location_info.plugins_dir(),
        true,
    )?)
}
