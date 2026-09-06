"use client"

import * as React from "react"
import { ExitDialog } from "@/components/exit-dialog"
import { onShowExitDialog, confirmExit, cancelExit } from "@/lib/desktop"

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

    React.useEffect(() => {
        const unsubscribe = onShowExitDialog(() => {
            setIsOpen(true)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleConfirm = React.useCallback(async (dontAskAgain: boolean) => {
        setIsOpen(false)
        await confirmExit(dontAskAgain)
    }, [])

    const handleCancel = React.useCallback(async () => {
        setIsOpen(false)
        await cancelExit()
    }, [])

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
