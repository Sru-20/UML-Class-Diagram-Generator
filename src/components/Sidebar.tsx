import { Box, CircleDot, Diamond, GitBranch, Link2, Plus, Shapes, SquareStack } from 'lucide-react'
import type { ClassKind, RelationshipType } from '../types/uml'

interface SidebarProps {
  onAddClass: (kind: ClassKind) => void
  onRelationship: (type: RelationshipType) => void
  onLoadStudent: () => void
  onLoadGeneral: () => void
}

export function Sidebar({ onAddClass, onRelationship, onLoadStudent, onLoadGeneral }: SidebarProps) {
  const components: Array<{ label: string; kind: ClassKind; icon: typeof Box }> = [
    { label: 'Add Class', kind: 'class', icon: Box },
    { label: 'Add Interface', kind: 'interface', icon: CircleDot },
    { label: 'Add Abstract Class', kind: 'abstract', icon: SquareStack },
  ]
  const relationships: Array<{ label: string; type: RelationshipType; icon: typeof Link2 }> = [
    { label: 'Association', type: 'association', icon: Link2 },
    { label: 'Aggregation', type: 'aggregation', icon: Diamond },
    { label: 'Composition', type: 'composition', icon: Shapes },
    { label: 'Inheritance', type: 'inheritance', icon: GitBranch },
    { label: 'Dependency', type: 'dependency', icon: CircleDot },
  ]
  return (
    <aside className="sidebar left-panel">
      <div className="sidebar-section">
        <div className="section-heading"><span>COMPONENTS</span><small>⌘ K</small></div>
        {components.map(({ label, kind, icon: Icon }) => <button className="side-action" key={kind} onClick={() => onAddClass(kind)}><Icon size={16} /><span>{label}</span><Plus size={14} className="action-plus" /></button>)}
      </div>
      <div className="sidebar-section">
        <div className="section-heading"><span>RELATIONSHIPS</span></div>
        {relationships.map(({ label, type, icon: Icon }) => <button className="side-action" key={type} onClick={() => onRelationship(type)}><Icon size={16} /><span>{label}</span></button>)}
      </div>
      <div className="sidebar-section templates">
        <div className="section-heading"><span>TEMPLATES</span></div>
        <button className="template-card" onClick={onLoadStudent}>
          <div className="template-icon"><Box size={18} /></div>
          <div><strong>Student Management</strong><span>6 classes · 7 relations</span></div>
        </button>
        <button className="template-card" onClick={onLoadGeneral}>
          <div className="template-icon general-template"><Shapes size={18} /></div>
          <div><strong>General Architecture</strong><span>6 layers · reusable starter</span></div>
        </button>
      </div>
      <div className="sidebar-tip"><strong>Quick tip</strong><span>Drag from a node handle to create a relationship. Select a class to edit its details.</span></div>
    </aside>
  )
}
