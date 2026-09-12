import { Download, FilePlus2, FolderOpen, Code2, Save, Sparkles } from 'lucide-react'

interface HeaderProps {
  onNew: () => void
  onLoad: () => void
  onSave: () => void
  onGenerate: () => void
  onExport: () => void
}

export function Header({ onNew, onLoad, onSave, onGenerate, onExport }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={17} /></div>
        <div><strong>UMLForge</strong><span>Student Architecture Studio</span></div>
      </div>
      <div className="header-actions">
        <button className="tool-button subtle" onClick={onNew}><FilePlus2 size={15} /> New Diagram</button>
        <button className="tool-button subtle" onClick={onLoad}><FolderOpen size={15} /> Load Student System</button>
        <button className="tool-button subtle" onClick={onSave}><Save size={15} /> Save Diagram</button>
        <button className="tool-button accent" onClick={onGenerate}><Code2 size={15} /> Generate Java</button>
        <button className="icon-button" aria-label="Export diagram" title="Export diagram" onClick={onExport}><Download size={17} /></button>
      </div>
    </header>
  )
}
