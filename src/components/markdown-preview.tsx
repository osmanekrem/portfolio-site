import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {ReactNode} from "react"
import React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CheckIcon, CopyIcon} from "lucide-react";

export function CodeCopyBtn({children}: { children: ReactNode }) {
    const [copyOk, setCopyOk] = React.useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const Icon = copyOk ? CheckIcon : CopyIcon;

    const handleClick = async (e: any) => {
        await navigator.clipboard.writeText(
                 (children as any)?.props?.children ?? ""

        );

        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <Button variant={'ghost'} size={'icon'} style={{
            color: iconColor,
        }} className={cn(
            'absolute top-2 right-2 z-10 opacity-0 bg-primary/25 border-0 group-hover:opacity-100 hover:bg-primary/80 transition-opacity duration-300',
        )} onClick={handleClick} >
            <Icon className={'size-3'} />
            <span className="sr-only">Copy code</span>
        </Button>
    )
}

export default function MarkdownPreview({content}: { content: string }) {

    return (
<div className="wmde-markdown">

        <ReactMarkdown
                       rehypePlugins={[rehypeRaw]}
                       remarkPlugins={[remarkGfm]}
                       components={{
                           pre({children}: { children: ReactNode }) {
                               return (<pre className="relative group">
                                        <CodeCopyBtn>{children}</CodeCopyBtn>
                                   {children}
                                    </pre>
                               )
                           },
                           code({node, inline, className = "", children, ...props}) {
                               const match = /language-(\w+)/.exec(className || '')
                               return !inline && match ? (
                                   <SyntaxHighlighter
                                       style={a11yDark}
                                       language={match[1]}
                                       className={"!bg-transparent !p-0"}
                                       PreTag="div"
                                       {...props}
                                   >
                                       {String(children).replace(/\n$/, '')}
                                   </SyntaxHighlighter>
                               ) : (
                                   <code className={'p-2 px-3 rounded-md before:hidden after:hidden'} style={{
                                       color: 'var(--tw-prose-pre-code)',
                                       backgroundColor: 'var(--tw-prose-pre-bg)'
                                   }} {...props}>
                                       {children}
                                   </code>
                               )
                           }
                       }}>
            {content}
        </ReactMarkdown>

</div>
    )
}