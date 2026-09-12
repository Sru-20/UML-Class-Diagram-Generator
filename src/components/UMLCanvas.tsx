import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, type Connection, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { UMLClass, UMLRelationship, RelationshipType } from '../types/uml'
import { ClassNode } from './ClassNode'

interface UMLCanvasProps { classes: UMLClass[]; relationships: UMLRelationship[]; selectedId?: string; onSelect: (id?: string) => void; onMove: (id: string, position: { x: number; y: number }) => void; onConnect: (connection: Connection) => void; onDeleteEdge: (id: string) => void; onDeleteNodes: (ids: string[]) => void }

const nodeTypes = { umlClass: ClassNode }
const edgeStyle: Record<RelationshipType, Pick<Edge, 'style' | 'markerEnd' | 'markerStart'>> = {
  association: { style: { stroke: '#7d8da9', strokeWidth: 1.5 } },
  aggregation: { style: { stroke: '#9ea9c1', strokeWidth: 1.5 }, markerStart: { type: 'arrowclosed', color: '#9ea9c1' } },
  composition: { style: { stroke: '#c084fc', strokeWidth: 1.8 }, markerStart: { type: 'arrowclosed', color: '#c084fc' } },
  inheritance: { style: { stroke: '#4fd1c5', strokeWidth: 1.8 }, markerEnd: { type: 'arrowclosed', color: '#4fd1c5' } },
  dependency: { style: { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5 4' }, markerEnd: { type: 'arrow', color: '#64748b' } },
}

export function UMLCanvas({ classes, relationships, selectedId, onSelect, onMove, onConnect, onDeleteEdge, onDeleteNodes }: UMLCanvasProps) {
  const nodes: Node[] = classes.map((umlClass) => ({ id: umlClass.id, type: 'umlClass', position: umlClass.position, data: { umlClass }, selected: umlClass.id === selectedId }))
  const edges: Edge[] = relationships.map((relationship) => ({ id: relationship.id, source: relationship.source, target: relationship.target, label: relationship.label ?? relationship.type, type: 'smoothstep', ...edgeStyle[relationship.type], labelStyle: { fill: '#94a3b8', fontSize: 10, fontWeight: 600 }, labelBgStyle: { fill: '#111827', fillOpacity: 0.9 }, labelBgPadding: [5, 3] }))
  return <div className="canvas-wrap"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.12 }} onNodeClick={(_, node) => onSelect(node.id)} onPaneClick={() => onSelect(undefined)} onNodeDragStop={(_, node) => onMove(node.id, node.position)} onConnect={onConnect} onEdgeDoubleClick={(_, edge) => onDeleteEdge(edge.id)} deleteKeyCode={['Backspace', 'Delete']} onNodesDelete={(deleted) => onDeleteNodes(deleted.map((node) => node.id))}><Background color="#27334a" gap={22} size={1} variant={BackgroundVariant.Dots} /><Controls showInteractive={false} /><MiniMap nodeColor="#334155" maskColor="rgba(7, 12, 25, .78)" /></ReactFlow><div className="canvas-status"><span><i className="live-dot" /> Canvas synced</span><span>{classes.length} classes · {relationships.length} relationships</span></div></div>
}
