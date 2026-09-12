import { Check, Clipboard, Download, X } from 'lucide-react'
import { useState } from 'react'

interface CodePreviewProps { files: Record<string, string>; onClose: () => void }

export function CodePreview({ files, onClose }: CodePreviewProps) {
  const names = Object.keys(files)
  const [active, setActive] = useState(names[0] ?? '')
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard.writeText(files[active] ?? ''); setCopied(true); window.setTimeout(() => setCopied(false), 1500) }
  const download = () => { const blob = new Blob([files[active] ?? ''], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = active; anchor.click(); URL.revokeObjectURL(url) }
  return <div className="modal-backdrop"><section className="code-modal"><div className="modal-head"><div><span className="eyebrow">JAVA CODE GENERATOR</span><h2>Generated source files</h2></div><button className="icon-button" onClick={onClose}><X size={17} /></button></div><div className="code-layout"><nav className="file-list">{names.map((name) => <button className={name === active ? 'active' : ''} onClick={() => setActive(name)} key={name}><span className="java-dot">J</span>{name}</button>)}</nav><div className="code-pane"><div className="code-toolbar"><span>src / main / java / {active}</span><div><button className="mini-button" onClick={copy}>{copied ? <Check size={13} /> : <Clipboard size={13} />}{copied ? 'Copied' : 'Copy Code'}</button><button className="mini-button" onClick={download}><Download size={13} /> Download</button></div></div><pre><code>{files[active]}</code></pre></div></div></section></div>
}
