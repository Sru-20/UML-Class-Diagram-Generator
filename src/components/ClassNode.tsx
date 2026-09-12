import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { MoreHorizontal } from 'lucide-react'
import type { UMLClass } from '../types/uml'

type ClassNodeData = { umlClass: UMLClass }

export function ClassNode({ data, selected }: NodeProps<Node<ClassNodeData>>) {
  const { umlClass } = data
  return (
    <div className={`uml-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className={`uml-node-title ${umlClass.kind === 'interface' ? 'interface-title' : ''}`}>
        <span>{umlClass.kind === 'abstract' ? '«abstract»' : umlClass.kind === 'interface' ? '«interface»' : '«class»'}</span>
        <strong>{umlClass.name}</strong><MoreHorizontal size={14} />
      </div>
      <div className="uml-divider" />
      <div className="uml-body">
        {umlClass.attributes.length ? umlClass.attributes.map((attribute) => <div className="uml-row" key={attribute.id}><b>{attribute.visibility}</b> {attribute.name} <em>: {attribute.type}</em></div>) : <div className="uml-empty-row">No attributes</div>}
      </div>
      <div className="uml-divider" />
      <div className="uml-body methods">
        {umlClass.methods.length ? umlClass.methods.map((method) => <div className="uml-row" key={method.id}><b>{method.visibility}</b> {method.name}()<em> : {method.returnType}</em></div>) : <div className="uml-empty-row">No methods</div>}
      </div>
    </div>
  )
}
