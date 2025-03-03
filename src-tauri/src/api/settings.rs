use tauri::State;

use crate::{
    state::{save_settings, ActionOnInstanceLaunch, SettingsState},
    AetherLauncherResult,
};

#[tauri::command]
pub async fn get_action_on_instance_launch(
    state: State<'_, SettingsState>,
) -> AetherLauncherResult<ActionOnInstanceLaunch> {
    let settings_state = state.lock().await;

    Ok(settings_state.action_on_instance_launch)
}

#[tauri::command]
pub async fn set_action_on_instance_launch(
    app_handle: tauri::AppHandle,
    state: State<'_, SettingsState>,
    action_on_instance_launch: ActionOnInstanceLaunch,
) -> Result<(), ()> {
    let mut settings_state = state.lock().await;

    settings_state.action_on_instance_launch = action_on_instance_launch;

    save_settings(app_handle, &settings_state).await;

    Ok(())
}
