use aether_core::state::PluginMetadata;

use crate::AetherLauncherResult;

#[tauri::command]
pub async fn scan_plugins() -> AetherLauncherResult<()> {
    Ok(aether_core::api::plugin::scan().await?)
}

#[tauri::command]
pub async fn list_plugins() -> AetherLauncherResult<Vec<PluginMetadata>> {
    Ok(aether_core::api::plugin::list().await?)
}

#[tauri::command]
pub async fn is_plugin_enabled(id: String) -> AetherLauncherResult<bool> {
    Ok(aether_core::api::plugin::is_enabled(&id).await?)
}

#[tauri::command]
pub async fn enable_plugin(id: String) -> AetherLauncherResult<()> {
    Ok(aether_core::api::plugin::enable(&id).await?)
}

#[tauri::command]
pub async fn disable_plugin(id: String) -> AetherLauncherResult<()> {
    Ok(aether_core::api::plugin::disable(&id).await?)
}

#[tauri::command]
pub async fn call_plugin(id: String, data: String) -> AetherLauncherResult<()> {
    Ok(aether_core::api::plugin::call(&id, &data).await?)
}
