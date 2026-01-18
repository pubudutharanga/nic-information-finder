'use client';

import { useState, useCallback, useEffect, useId } from 'react';
import { useIntl } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { validateNIC, type NICValidationResult } from '@/lib/nic-utils';

interface NICInputProps {
    onValidNIC: (nic: string) => void;
    onInvalidNIC: () => void;
}

export default function NICInput({ onValidNIC, onInvalidNIC }: NICInputProps) {
    const intl = useIntl();
    const inputId = useId();
    const errorId = useId();

    const [value, setValue] = useState('');
    const [validation, setValidation] = useState<NICValidationResult | null>(null);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (!value) {
            setValidation(null);
            onInvalidNIC();
            return;
        }

        const result = validateNIC(value);
        setValidation(result);

        if (result.isValid) {
            onValidNIC(value);
        } else {
            onInvalidNIC();
        }
    }, [value, onValidNIC, onInvalidNIC]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase();
        const sanitized = newValue.replace(/[^0-9VX]/gi, '');
        setValue(sanitized);
        setIsTouched(true);
    }, []);

    const showError = isTouched && validation && !validation.isValid && value.length > 0;
    const showSuccess = validation?.isValid;

    const inputStateClass = showSuccess ? 'input-valid' : showError ? 'input-error' : '';

    return (
        <div className="w-full max-w-xl mx-auto">
            <label
                htmlFor={inputId}
                className="block text-lg font-semibold mb-2"
                style={{ color: 'rgb(var(--color-text))' }}
            >
                {intl.formatMessage({ id: 'input.label' })}
            </label>

            <div className="relative">
                <input
                    id={inputId}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setIsTouched(true)}
                    placeholder={intl.formatMessage({ id: 'input.placeholder' })}
                    aria-describedby={showError ? errorId : undefined}
                    aria-invalid={showError}
                    autoComplete="off"
                    maxLength={12}
                    className={`input ${inputStateClass} pr-12 font-mono text-lg tracking-wider`}
                />

                <AnimatePresence mode="wait">
                    {showSuccess && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="rgb(var(--color-success))" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                    )}

                    {showError && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="rgb(var(--color-error))" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
                {showError && validation?.errorKey ? (
                    <motion.p
                        id={errorId}
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm"
                        style={{ color: 'rgb(var(--color-error))' }}
                        role="alert"
                    >
                        {intl.formatMessage({ id: validation.errorKey })}
                    </motion.p>
                ) : showSuccess ? (
                    <motion.p
                        key="success"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm"
                        style={{ color: 'rgb(var(--color-success))' }}
                    >
                        {intl.formatMessage({ id: 'validation.valid' })}
                    </motion.p>
                ) : (
                    <motion.p
                        key="help"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                        {intl.formatMessage({ id: 'input.helpText' })}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
