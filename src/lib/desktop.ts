// Unified desktop bridge supporting Tauri v2 with fallback for Electron & browser

export function isTauri(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).__TAURI_INTERNALS__ || (window as any).__TAURI__);
}

export function isElectron(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).require && (window as any).require('electron'));
}

export function isDesktopApp(): boolean {
  return isTauri() || isElectron();
}

/**
 * Window Controls
 */
export async function minimizeWindow(): Promise<void> {
  if (isTauri()) {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().minimize();
    } catch (e) {
      console.error('Failed to minimize window in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-minimize');
    } catch (e) {}
  }
}

export async function toggleMaximizeWindow(): Promise<void> {
  if (isTauri()) {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().toggleMaximize();
    } catch (e) {
      console.error('Failed to toggle maximize window in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-maximize');
    } catch (e) {}
  }
}

export async function isWindowMaximized(): Promise<boolean> {
  if (isTauri()) {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      return await getCurrentWindow().isMaximized();
    } catch (e) {
      return false;
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      return await ipcRenderer.invoke('is-window-maximized');
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function onWindowMaximizedChange(callback: (maximized: boolean) => void): () => void {
  let unlistenTauriResize: (() => void) | undefined;

  if (isTauri()) {
    import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
      const win = getCurrentWindow();
      win.isMaximized().then(callback).catch(() => {});
      win.onResized(async () => {
        const max = await win.isMaximized();
        callback(max);
      }).then((unlisten) => {
        unlistenTauriResize = unlisten;
      }).catch(() => {});
    }).catch(() => {});

    return () => {
      if (unlistenTauriResize) unlistenTauriResize();
    };
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      const handler = (_: any, max: boolean) => callback(max);
      ipcRenderer.on('window-maximized-change', handler);
      return () => {
        ipcRenderer.removeListener('window-maximized-change', handler);
      };
    } catch (e) {}
  }

  return () => {};
}

/**
 * Exit Dialog & Close Interception
 */
export function onShowExitDialog(callback: () => void): () => void {
  let unlistenTauri: (() => void) | undefined;

  if (isTauri()) {
    import('@tauri-apps/api/event').then(({ listen }) => {
      listen('show-exit-dialog', () => {
        callback();
      }).then((unlisten) => {
        unlistenTauri = unlisten;
      }).catch(() => {});
    }).catch(() => {});

    return () => {
      if (unlistenTauri) unlistenTauri();
    };
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      const handler = () => callback();
      ipcRenderer.on('show-exit-dialog', handler);
      return () => {
        ipcRenderer.removeListener('show-exit-dialog', handler);
      };
    } catch (e) {}
  }

  return () => {};
}

export async function requestWindowClose(): Promise<void> {
  if (isTauri()) {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().close();
    } catch (e) {
      console.error('Failed to close window in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-close');
    } catch (e) {}
  }
}

export async function confirmExit(dontAskAgain?: boolean): Promise<void> {
  if (dontAskAgain) {
    await setSkipCloseConfirmation(true);
  }

  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('confirm_exit');
    } catch (e) {
      console.error('Failed to confirm exit in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('confirm-exit');
    } catch (e) {}
  }
}

export async function cancelExit(): Promise<void> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('cancel_exit');
    } catch (e) {
      console.error('Failed to cancel exit in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('cancel-exit');
    } catch (e) {}
  }
}

/**
 * Settings Persistence
 */
export async function getSkipCloseConfirmation(): Promise<boolean> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<boolean>('get_skip_close_confirmation');
    } catch (e) {
      return false;
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      return await ipcRenderer.invoke('get-skip-close-confirmation');
    } catch (e) {
      return false;
    }
  }
  return false;
}

export async function setSkipCloseConfirmation(skip: boolean): Promise<void> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_skip_close_confirmation', { value: skip });
    } catch (e) {
      console.error('Failed to set skip close confirmation in Tauri:', e);
    }
  } else if (isElectron()) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      await ipcRenderer.invoke('set-skip-close-confirmation', skip);
    } catch (e) {}
  }
}

/**
 * Open external links in default web browser
 */
export async function openExternalLink(url: string): Promise<void> {
  if (isTauri()) {
    try {
      const { openUrl } = await import('@tauri-apps/plugin-opener');
      await openUrl(url);
    } catch (e) {
      window.open(url, '_blank', 'noreferrer');
    }
  } else {
    window.open(url, '_blank', 'noreferrer');
  }
}
