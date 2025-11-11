//  libs
import clsx from "clsx"
import { useState, useRef, useEffect } from "react"

//  props
interface Props {
    isOpen: boolean
    onClose: () => void
    postalCodesData: PostalCodesType[]
    onSelect: (postalCode: PostalCodesType) => void
    destinationTitle: string
}

export default function PostalCodeSelectModal({ isOpen, onClose, postalCodesData, onSelect, destinationTitle }: Props) {
    const [selectedPostalCodeId, setSelectedPostalCodeId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter postal codes based on search query
    const filteredPostalCodes = postalCodesData.filter(postalCode =>
        postalCode.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isDropdownOpen])

    // Reset search when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("")
            setSelectedPostalCodeId(null)
            setIsDropdownOpen(false)
            setIsClosing(false)
        }
    }, [isOpen])

    // Handle closing animation
    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setSelectedPostalCodeId(null)
            setSearchQuery("")
            setIsDropdownOpen(false)
            onClose()
        }, 200) // Match animation duration
    }

    const handleConfirm = () => {
        if (selectedPostalCodeId !== null) {
            const selectedPostalCode = postalCodesData.find(postalCode => postalCode.id === selectedPostalCodeId)
            if (selectedPostalCode) {
                onSelect(selectedPostalCode)
                setSelectedPostalCodeId(null)
                setSearchQuery("")
                handleClose()
            }
        }
    }

    if (!isOpen && !isClosing) return null

    const handlePostalCodeClick = (postalCode: PostalCodesType) => {
        setSelectedPostalCodeId(postalCode.id)
        setSearchQuery(postalCode.name)
        setIsDropdownOpen(false)
    }

    const selectedPostalCode = selectedPostalCodeId ? postalCodesData.find(postalCode => postalCode.id === selectedPostalCodeId) : null

    return (
        <div
            className={clsx(
                'fixed inset-0 z-50',
                'flex items-center justify-center',
                'bg-black/60',
                'transition-opacity duration-200',
                isClosing ? 'opacity-0' : 'opacity-100'
            )}
            onClick={handleClose}
        >
            <div
                className={clsx(
                    'bg-white rounded-lg',
                    'p-6',
                    'max-w-md w-full mx-4',
                    'shadow-xl',
                    'relative',
                    'transition-all duration-200',
                    isClosing 
                        ? 'opacity-0 scale-95 translate-y-2' 
                        : 'opacity-100 scale-100 translate-y-0'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className={clsx(
                        'absolute top-4 right-4',
                        'text-gray-500 hover:text-gray-700',
                        'text-2xl font-bold',
                        'w-8 h-8',
                        'flex items-center justify-center',
                        'rounded-full hover:bg-gray-100',
                        'transition-colors'
                    )}
                >
                    ×
                </button>

                {/* Title */}
                <h2 className={clsx(
                    'text-2xl font-bold',
                    'mb-4',
                    'text-gray-800'
                )}>
                    Select Postal Code for {destinationTitle}
                </h2>

                {/* Searchable Dropdown */}
                <div className={clsx('mb-6')} ref={dropdownRef}>
                    <label className={clsx(
                        'block text-sm font-medium',
                        'text-gray-700 mb-2'
                    )}>
                        Choose a Postal Code:
                    </label>
                    <div className={clsx('relative')}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setIsDropdownOpen(true)
                                // Clear selection when user starts typing a new search
                                if (selectedPostalCodeId && e.target.value !== selectedPostalCode?.name) {
                                    setSelectedPostalCodeId(null)
                                }
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            placeholder="Search postal codes..."
                            className={clsx(
                                'w-full',
                                'px-4 py-2',
                                'border border-gray-300 rounded-lg',
                                'text-gray-800',
                                'focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent',
                                'transition-all'
                            )}
                        />
                        
                        {/* Dropdown List */}
                        {isDropdownOpen && (
                            <div className={clsx(
                                'absolute z-10 w-full mt-1',
                                'bg-white border border-gray-300 rounded-lg',
                                'shadow-lg',
                                'max-h-60 overflow-y-auto'
                            )}>
                                {filteredPostalCodes.length > 0 ? (
                                    filteredPostalCodes.map((postalCode) => (
                                        <div
                                            key={postalCode.id}
                                            onClick={() => handlePostalCodeClick(postalCode)}
                                            className={clsx(
                                                'px-4 py-3',
                                                'cursor-pointer',
                                                'hover:bg-gray-50',
                                                'transition-colors',
                                                selectedPostalCodeId === postalCode.id && 'bg-red/10'
                                            )}
                                        >
                                            <div className={clsx('text-gray-800 font-medium')}>
                                                {postalCode.name}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={clsx('px-4 py-3 text-gray-500 text-center')}>
                                        No postal codes found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Selected Postal Code Display */}
                    {selectedPostalCode && (
                        <div className={clsx(
                            'mt-3 p-3',
                            'bg-gray-50 rounded-lg',
                            'border border-gray-200'
                        )}>
                            <div className={clsx('text-gray-800 font-medium')}>
                                {selectedPostalCode.name}
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className={clsx(
                    'flex gap-3',
                    'justify-end'
                )}>
                    <button
                        onClick={handleClose}
                        className={clsx(
                            'px-4 py-2',
                            'border border-gray-300 rounded-lg',
                            'text-gray-700',
                            'hover:bg-gray-50',
                            'transition-colors'
                        )}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={selectedPostalCodeId === null}
                        className={clsx(
                            'px-4 py-2',
                            'bg-red text-white rounded-lg',
                            'font-medium',
                            'hover:opacity-90',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'transition-opacity'
                        )}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

