import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Connection } from '@xyflow/react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { UMLCanvas } from './components/UMLCanvas'
import { PropertiesPanel } from './components/PropertiesPanel'
import { CodePreview } from './components/CodePreview'
import { generateJavaFiles } from './services/javaGenerator'
import { studentSystem } from './data/studentSystem'
import { generalArchitecture } from './data/generalArchitecture'
import { emptyClass, emptyDiagram, uid } from './utils/umlHelpers'
import type { ClassKind, DiagramState, RelationshipType } from './types/uml'
import './styles.css'

const STORAGE_KEY = 'umlforge-diagram'

export default function App() {
  const [diagram, setDiagram] = useState<DiagramState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as DiagramState : studentSystem
  })
  const [selectedId, setSelectedId] = useState<string>()
  const [relationshipMode, setRelationshipMode] = useState<RelationshipType>('association')
  const [files, setFiles] = useState<Record<string, string>>()
  const [toast, setToast] = useState('Ready to design')
  const [diagramTitle, setDiagramTitle] = useState('Student Management System')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(diagram)) }, [diagram])
  useEffect(() => { const timer = window.setTimeout(() => setToast(''), 2600); return () => window.clearTimeout(timer) }, [toast])

  const selectedClass = useMemo(() => diagram.classes.find((item) => item.id === selectedId), [diagram.classes, selectedId])
  const notify = (message: string) => setToast(message)
  const loadStudentTemplate = () => { setDiagram(structuredClone(studentSystem)); setDiagramTitle('Student Management System'); setSelectedId(undefined); notify('Student Management System loaded') }
  const loadGeneralTemplate = () => { setDiagram(structuredClone(generalArchitecture)); setDiagramTitle('General Application Architecture'); setSelectedId(undefined); notify('General Architecture template loaded') }
  const createNew = () => { setDiagram(emptyDiagram()); setDiagramTitle('Untitled Diagram'); setSelectedId(undefined); notify('New blank diagram created') }
  const addClass = (kind: ClassKind) => {
    const name = kind === 'interface' ? 'NewInterface' : kind === 'abstract' ? 'BaseClass' : 'NewClass'
    const next = emptyClass(name, { x: 250 + diagram.classes.length * 35, y: 180 + diagram.classes.length * 25 })
    next.kind = kind
    setDiagram((current) => ({ ...current, classes: [...current.classes, next] }))
    setSelectedId(next.id)
    notify(`${kind === 'class' ? 'Class' : kind === 'interface' ? 'Interface' : 'Abstract class'} added`)
  }
  const updateClass = (updated: typeof selectedClass & object) => {
    if (!updated) return
    setDiagram((current) => ({ ...current, classes: current.classes.map((item) => item.id === updated.id ? updated : item) }))
    setSelectedId(updated.id)
  }
  const deleteClass = () => {
    if (!selectedClass || !window.confirm(`Delete ${selectedClass.name}? This also removes its relationships.`)) return
    setDiagram((current) => ({ classes: current.classes.filter((item) => item.id !== selectedClass.id), relationships: current.relationships.filter((item) => item.source !== selectedClass.id && item.target !== selectedClass.id) }))
    setSelectedId(undefined)
    notify(`${selectedClass.name} deleted`)
  }
  const moveClass = useCallback((id: string, position: { x: number; y: number }) => setDiagram((current) => ({ ...current, classes: current.classes.map((item) => item.id === id ? { ...item, position } : item) })), [])
  const connect = (connection: Connection) => {
    if (!connection.source || !connection.target || connection.source === connection.target) return
    const exists = diagram.relationships.some((item) => item.source === connection.source && item.target === connection.target)
    if (exists) { notify('That relationship already exists'); return }
    setDiagram((current) => ({ ...current, relationships: [...current.relationships, { id: uid('relation'), source: connection.source as string, target: connection.target as string, type: relationshipMode }] }))
    notify(`${relationshipMode[0].toUpperCase()}${relationshipMode.slice(1)} created`)
  }
  const deleteEdge = (id: string) => setDiagram((current) => ({ ...current, relationships: current.relationships.filter((item) => item.id !== id) }))
  const deleteNodes = (ids: string[]) => {
    if (!ids.length) return
    setDiagram((current) => ({ classes: current.classes.filter((item) => !ids.includes(item.id)), relationships: current.relationships.filter((item) => !ids.includes(item.source) && !ids.includes(item.target)) }))
    setSelectedId(undefined)
    notify(`${ids.length} class${ids.length === 1 ? '' : 'es'} deleted`)
  }
  const save = () => { localStorage.setItem(STORAGE_KEY, JSON.stringify(diagram)); notify('Diagram saved locally') }
  const exportDiagram = () => { const blob = new Blob([JSON.stringify(diagram, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'umlforge-diagram.json'; anchor.click(); URL.revokeObjectURL(url); notify('Diagram exported') }
  return <div className="app-shell">
    <Header onNew={createNew} onLoad={loadStudentTemplate} onSave={save} onGenerate={() => { setFiles(generateJavaFiles(diagram)); notify('Java source generated') }} onExport={exportDiagram} />
    <main className="workspace"><Sidebar onAddClass={addClass} onRelationship={(type) => { setRelationshipMode(type); notify(`${type[0].toUpperCase()}${type.slice(1)} tool active — connect two nodes`) }} onLoadStudent={loadStudentTemplate} onLoadGeneral={loadGeneralTemplate} />
      <section className="canvas-section"><div className="canvas-toolbar"><div><span className="eyebrow">UNTITLED DIAGRAM</span><h1>{diagramTitle} <span className="draft-pill">DRAFT</span></h1></div><div className="toolbar-meta"><span className="active-tool"><i /> {relationshipMode}</span><span className="shortcut">⌘ S</span></div></div><UMLCanvas classes={diagram.classes} relationships={diagram.relationships} selectedId={selectedId} onSelect={setSelectedId} onMove={moveClass} onConnect={connect} onDeleteEdge={deleteEdge} onDeleteNodes={deleteNodes} /></section>
      <PropertiesPanel selectedClass={selectedClass} onChange={updateClass} onDelete={deleteClass} onClose={() => setSelectedId(undefined)} />
    </main>
    {files && <CodePreview files={files} onClose={() => setFiles(undefined)} />}
    {toast && <div className="toast"><span className="toast-check">✓</span>{toast}</div>}
  </div>
}
