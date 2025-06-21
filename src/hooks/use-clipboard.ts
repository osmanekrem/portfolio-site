import {useCallback, useState} from "react";

export const useClipboard = () => {
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(''), 2000);
            return true;
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
            return false;
        }
    }, []);

    return { copyToClipboard, copiedText };
};