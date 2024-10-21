// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod api;
pub mod models;
pub mod state;
pub mod utils;

use tauri::Manager;

use api::tauri::{
    create_minecraft_instance, get_minecraft_instances, get_minecraft_version_manifest,
    initialize_state, launch_minecraft_instance, remove_minecraft_instance,
};

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .max_file_size(50_000 /* bytes */)
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::LogDir {
                        file_name: Some("logs".to_string()),
                    },
                ))
                .level(log::LevelFilter::Trace)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            app.manage(crate::state::AppState::default());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            initialize_state,
            get_minecraft_version_manifest,
            create_minecraft_instance,
            get_minecraft_instances,
            launch_minecraft_instance,
            remove_minecraft_instance
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
