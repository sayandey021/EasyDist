"use client"

import * as React from "react"
import { ExitDialog } from "@/components/exit-dialog"

interface ExitDialogContextType {
    showExitDialog: () => void
}

const ExitDialogContext = React.createContext<ExitDialogContextType | null>(null)

export function useExitDialog() {
    const context = React.useContext(ExitDialogContext)
    if (!context) {
        throw new Error("useExitDialog must be used within ExitDialogProvider")
    }
    return context
}

export function ExitDialogProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isElectron, setIsElectron] = React.useState(false)

    React.useEffect(() => {
        // Check if running in Electron
        const electronCheck = typeof window !== 'undefined' &&
            typeof (window as any).require !== 'undefined'

        setIsElectron(electronCheck)

        if (electronCheck) {
            try {
                const { ipcRenderer } = (window as any).require('electron')

                // Listen for close request from main process
                const handleShowExitDialog = () => {
                    setIsOpen(true)
                }

                ipcRenderer.on('show-exit-dialog', handleShowExitDialog)

                return () => {
                    ipcRenderer.removeListener('show-exit-dialog', handleShowExitDialog)
                }
            } catch (error) {
                console.error('Failed to setup IPC listener:', error)
            }
        }
    }, [])

    const handleConfirm = React.useCallback(async (dontAskAgain: boolean) => {
        setIsOpen(false)

        if (isElectron) {
            try {
                const { ipcRenderer } = (window as any).require('electron')

                // Save preference if checked
                if (dontAskAgain) {
                    await ipcRenderer.invoke('set-skip-close-confirmation', true)
                }

                // Tell main process to close
                ipcRenderer.send('confirm-exit')
            } catch (error) {
                console.error('Failed to confirm exit:', error)
            }
        }
    }, [isElectron])

    const handleCancel = React.useCallback(() => {
        setIsOpen(false)

        if (isElectron) {
            try {
                const { ipcRenderer } = (window as any).require('electron')
                ipcRenderer.send('cancel-exit')
            } catch (error) {
                console.error('Failed to cancel exit:', error)
            }
        }
    }, [isElectron])

    const showExitDialog = React.useCallback(() => {
        setIsOpen(true)
    }, [])

    return (
        <ExitDialogContext.Provider value={{ showExitDialog }}>
            {children}
            <ExitDialog
                isOpen={isOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ExitDialogContext.Provider>
    )
}
