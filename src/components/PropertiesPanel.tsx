import { Plus, Trash2, X } from 'lucide-react'
import type { UMLAttribute, UMLClass, UMLMethod, Visibility } from '../types/uml'
import { uid } from '../utils/umlHelpers'

interface PropertiesPanelProps {
  selectedClass?: UMLClass
  onChange: (updated: UMLClass) => void
  onDelete: () => void
  onClose: () => void
}

const visibilityOptions: Visibility[] = ['+', '-', '#']

export function PropertiesPanel({ selectedClass, onChange, onDelete, onClose }: PropertiesPanelProps) {
  if (!selectedClass) return <aside className="right-panel empty-inspector"><div className="empty-inspector-art">◈</div><strong>Select a class</strong><span>Choose a class on the canvas to inspect and edit its architecture.</span></aside>
  const updateAttribute = (id: string, patch: Partial<UMLAttribute>) => onChange({ ...selectedClass, attributes: selectedClass.attributes.map((item) => item.id === id ? { ...item, ...patch } : item) })
  const updateMethod = (id: string, patch: Partial<UMLMethod>) => onChange({ ...selectedClass, methods: selectedClass.methods.map((item) => item.id === id ? { ...item, ...patch } : item) })
  return (
    <aside className="right-panel">
      <div className="inspector-heading"><div><span className="eyebrow">INSPECTOR</span><h2>{selectedClass.name}</h2></div><button className="icon-button" onClick={onClose}><X size={16} /></button></div>
      <label className="field-label">Class name<input value={selectedClass.name} onChange={(event) => onChange({ ...selectedClass, name: event.target.value })} /></label>
      <div className="inspector-scroll">
        <div className="inspector-group"><div className="group-title"><span>ATTRIBUTES <small>{selectedClass.attributes.length}</small></span><button className="mini-button" onClick={() => onChange({ ...selectedClass, attributes: [...selectedClass.attributes, { id: uid('attr'), name: 'newField', type: 'String', visibility: '-' }] })}><Plus size={13} /> Add</button></div>
          {selectedClass.attributes.map((attribute) => <div className="property-row" key={attribute.id}><select value={attribute.visibility} onChange={(event) => updateAttribute(attribute.id, { visibility: event.target.value as Visibility })}>{visibilityOptions.map((value) => <option key={value}>{value}</option>)}</select><input value={attribute.name} onChange={(event) => updateAttribute(attribute.id, { name: event.target.value })} /><input value={attribute.type} onChange={(event) => updateAttribute(attribute.id, { type: event.target.value })} /><button className="delete-mini" onClick={() => onChange({ ...selectedClass, attributes: selectedClass.attributes.filter((item) => item.id !== attribute.id) })}><Trash2 size={13} /></button></div>)}
        </div>
        <div className="inspector-group"><div className="group-title"><span>METHODS <small>{selectedClass.methods.length}</small></span><button className="mini-button" onClick={() => onChange({ ...selectedClass, methods: [...selectedClass.methods, { id: uid('method'), name: 'newMethod', returnType: 'void', visibility: '+', parameters: [] }] })}><Plus size={13} /> Add</button></div>
          {selectedClass.methods.map((method) => <div className="method-card" key={method.id}><div className="property-row"><select value={method.visibility} onChange={(event) => updateMethod(method.id, { visibility: event.target.value as Visibility })}>{visibilityOptions.map((value) => <option key={value}>{value}</option>)}</select><input value={method.name} onChange={(event) => updateMethod(method.id, { name: event.target.value })} /><input value={method.returnType} onChange={(event) => updateMethod(method.id, { returnType: event.target.value })} /><button className="delete-mini" onClick={() => onChange({ ...selectedClass, methods: selectedClass.methods.filter((item) => item.id !== method.id) })}><Trash2 size={13} /></button></div><div className="parameters-head"><span>PARAMETERS</span><button className="parameter-add" onClick={() => updateMethod(method.id, { parameters: [...method.parameters, { id: uid('param'), name: 'value', type: 'String' }] })}><Plus size={11} /> Add</button></div>{method.parameters.map((parameter) => <div className="parameter-row" key={parameter.id}><input value={parameter.name} onChange={(event) => updateMethod(method.id, { parameters: method.parameters.map((item) => item.id === parameter.id ? { ...item, name: event.target.value } : item) })} /><input value={parameter.type} onChange={(event) => updateMethod(method.id, { parameters: method.parameters.map((item) => item.id === parameter.id ? { ...item, type: event.target.value } : item) })} /><button className="delete-mini" onClick={() => updateMethod(method.id, { parameters: method.parameters.filter((item) => item.id !== parameter.id) })}><Trash2 size={12} /></button></div>)}</div>)}
        </div>
      </div>
      <div className="inspector-footer"><button className="apply-button" onClick={() => onChange({ ...selectedClass })}>Apply Changes</button><button className="delete-class" onClick={onDelete}><Trash2 size={14} /> Delete Class</button></div>
    </aside>
  )
}
