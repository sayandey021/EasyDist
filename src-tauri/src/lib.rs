use std::fs;
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use tauri::{AppHandle, Emitter, Manager, WindowEvent};

#[derive(Default)]
pub struct AppState {
    pub skip_close_confirmation: AtomicBool,
    pub force_close: AtomicBool,
}

fn get_config_path(app_handle: &AppHandle) -> Option<PathBuf> {
    app_handle
        .path()
        .app_config_dir()
        .ok()
        .map(|dir| dir.join("settings.json"))
}

fn load_settings(app_handle: &AppHandle) -> bool {
    if let Some(path) = get_config_path(app_handle) {
        if path.exists() {
            if let Ok(content) = fs::read_to_string(&path) {
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(&content) {
                    return val
                        .get("skipCloseConfirmation")
                        .and_then(|v| v.as_bool())
                        .unwrap_or(false);
                }
            }
        }
    }
    false
}

fn save_settings(app_handle: &AppHandle, skip: bool) {
    if let Some(path) = get_config_path(app_handle) {
        if let Some(parent) = path.parent() {
            let _ = fs::create_dir_all(parent);
        }
        let json = serde_json::json!({
            "skipCloseConfirmation": skip
        });
        let _ = fs::write(path, json.to_string());
    }
}

#[tauri::command]
fn get_skip_close_confirmation(state: tauri::State<'_, Arc<AppState>>) -> bool {
    state.skip_close_confirmation.load(Ordering::SeqCst)
}

#[tauri::command]
fn set_skip_close_confirmation(
    app: AppHandle,
    state: tauri::State<'_, Arc<AppState>>,
    value: bool,
) -> Result<bool, String> {
    state.skip_close_confirmation.store(value, Ordering::SeqCst);
    save_settings(&app, value);
    Ok(true)
}

#[tauri::command]
fn confirm_exit(app: AppHandle, state: tauri::State<'_, Arc<AppState>>) {
    state.force_close.store(true, Ordering::SeqCst);
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.close();
    }
}

#[tauri::command]
fn cancel_exit() {
    // Exit cancelled by user
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_state = Arc::new(AppState::default());

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
            }
        }))
        .manage(app_state.clone())
        .invoke_handler(tauri::generate_handler![
            get_skip_close_confirmation,
            set_skip_close_confirmation,
            confirm_exit,
            cancel_exit
        ])
        .setup(move |app| {
            let initial_skip = load_settings(&app.handle());
            app_state
                .skip_close_confirmation
                .store(initial_skip, Ordering::SeqCst);

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                let state = window.state::<Arc<AppState>>();
                if state.force_close.load(Ordering::SeqCst)
                    || state.skip_close_confirmation.load(Ordering::SeqCst)
                {
                    return;
                }
                api.prevent_close();
                let _ = window.emit("show-exit-dialog", ());
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
