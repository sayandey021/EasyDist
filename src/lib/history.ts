
export const historyKey = 'distro-accel-history';

export type HistoryItem = {
  id: string;
  type: 'WinGet' | 'Chocolatey' | 'Scoop' | 'F-Droid' | 'Homebrew' | 'Flathub' | 'Snap' | 'Nix' | 'AUR';
  packageName: string;
  packageVersion: string;
  createdAt: string;
  formData?: Record<string, unknown>; // Store complete form data for updates
};

export function saveHistoryItem(
  item: Omit<HistoryItem, 'id' | 'createdAt'>
) {
  try {
    const savedHistory = localStorage.getItem(historyKey);
    const history: HistoryItem[] = savedHistory ? JSON.parse(savedHistory) : [];

    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    history.push(newItem);
    localStorage.setItem(historyKey, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history item to localStorage', error);
  }
}

export function getHistoryItem(id: string): HistoryItem | null {
  try {
    const savedHistory = localStorage.getItem(historyKey);
    if (!savedHistory) return null;

    const history: HistoryItem[] = JSON.parse(savedHistory);
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Failed to get history item from localStorage', error);
    return null;
  }
}

export function getHistoryByType(type: HistoryItem['type']): HistoryItem[] {
  try {
    const savedHistory = localStorage.getItem(historyKey);
    if (!savedHistory) return [];

    const history: HistoryItem[] = JSON.parse(savedHistory);
    return history
      .filter(item => item.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Failed to get history by type from localStorage', error);
    return [];
  }
}
