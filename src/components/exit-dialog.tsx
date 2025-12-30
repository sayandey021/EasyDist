"use client"

import * as React from "react"
import { LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

interface ExitDialogProps {
    isOpen: boolean
    onConfirm: (dontAskAgain: boolean) => void
    onCancel: () => void
}

export function ExitDialog({ isOpen, onConfirm, onCancel }: ExitDialogProps) {
    const [dontAskAgain, setDontAskAgain] = React.useState(false)
    const dialogRef = React.useRef<HTMLDivElement>(null)

    // Handle escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onCancel()
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onCancel])

    // Focus trap
    React.useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop with blur - Fluent UI Acrylic effect */}
            <div
                className={cn(
                    "fixed inset-0 z-[100]",
                    "bg-black/40 backdrop-blur-md",
                    "transition-all duration-300 ease-out",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onCancel}
                aria-hidden="true"
            />

            {/* Dialog Container */}
            <div
                ref={dialogRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="exit-dialog-title"
                aria-describedby="exit-dialog-description"
                tabIndex={-1}
                className={cn(
                    "fixed left-1/2 top-1/2 z-[101]",
                    "w-[90vw] max-w-[400px]",
                    "-translate-x-1/2 -translate-y-1/2",
                    // Fluent UI Card styling - elevated surface with acrylic
                    "bg-card/95 backdrop-blur-xl",
                    "border border-border/50",
                    "rounded-lg shadow-2xl",
                    // Animation
                    "transition-all duration-200 ease-out",
                    isOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none",
                    // Subtle glow effect
                    "ring-1 ring-white/5"
                )}
            >
                {/* Header with icon */}
                <div className="flex items-start gap-4 p-6 pb-4">
                    {/* Icon Container - Fluent UI style with accent background */}
                    <div className={cn(
                        "flex-shrink-0",
                        "w-12 h-12 rounded-full",
                        "bg-primary/10",
                        "flex items-center justify-center",
                        "ring-1 ring-primary/20"
                    )}>
                        <LogOut className="w-6 h-6 text-primary" />
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1 space-y-1.5">
                        <h2
                            id="exit-dialog-title"
                            className="text-lg font-semibold tracking-tight text-foreground"
                        >
                            Exit EasyDist?
                        </h2>
                        <p
                            id="exit-dialog-description"
                            className="text-sm text-muted-foreground leading-relaxed"
                        >
                            Are you sure you want to close the application?
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onCancel}
                        className={cn(
                            "flex-shrink-0 -mt-1 -mr-2",
                            "w-8 h-8 rounded-md",
                            "flex items-center justify-center",
                            "text-muted-foreground hover:text-foreground",
                            "hover:bg-accent/80",
                            "transition-colors duration-150",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        )}
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Checkbox Section */}
                <div className="px-6 pb-4">
                    <label
                        className={cn(
                            "flex items-center gap-3 cursor-pointer",
                            "py-2 px-3 -mx-3 rounded-md",
                            "hover:bg-accent/50 transition-colors duration-150"
                        )}
                    >
                        <Checkbox
                            id="dont-ask-again"
                            checked={dontAskAgain}
                            onCheckedChange={(checked) => setDontAskAgain(checked === true)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm text-muted-foreground select-none">
                            Don&apos;t ask me again
                        </span>
                    </label>
                </div>

                {/* Footer with actions - Fluent UI button styling */}
                <div className={cn(
                    "flex items-center justify-end gap-2",
                    "px-6 py-4",
                    "bg-muted/30 border-t border-border/50",
                    "rounded-b-lg"
                )}>
                    {/* Cancel Button - Secondary style */}
                    <button
                        onClick={onCancel}
                        className={cn(
                            "px-4 py-2 min-w-[80px]",
                            "text-sm font-medium",
                            "bg-secondary/80 hover:bg-secondary",
                            "text-secondary-foreground",
                            "border border-border/50",
                            "rounded-md",
                            "transition-all duration-150",
                            "hover:shadow-sm",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        )}
                    >
                        No
                    </button>

                    {/* Confirm Button - Primary accent style */}
                    <button
                        onClick={() => onConfirm(dontAskAgain)}
                        className={cn(
                            "px-4 py-2 min-w-[80px]",
                            "text-sm font-medium",
                            "bg-primary hover:bg-primary/90",
                            "text-primary-foreground",
                            "rounded-md",
                            "transition-all duration-150",
                            "hover:shadow-md hover:shadow-primary/25",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        )}
                    >
                        Yes, Exit
                    </button>
                </div>
            </div>
        </>
    )
}
