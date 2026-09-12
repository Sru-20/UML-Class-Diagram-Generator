import type { DiagramState, UMLClass } from '../types/uml'

export const uid = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`

export const emptyClass = (name = 'NewClass', position = { x: 280, y: 160 }): UMLClass => ({
  id: uid('class'),
  name,
  kind: 'class',
  attributes: [],
  methods: [],
  position,
})

export const emptyDiagram = (): DiagramState => ({ classes: [], relationships: [] })
