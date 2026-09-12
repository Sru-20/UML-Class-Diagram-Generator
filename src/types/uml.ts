export type Visibility = '+' | '-' | '#'
export type ClassKind = 'class' | 'interface' | 'abstract'
export type RelationshipType = 'association' | 'aggregation' | 'composition' | 'inheritance' | 'dependency'

export interface UMLAttribute {
  id: string
  name: string
  type: string
  visibility: Visibility
}

export interface UMLParameter {
  id: string
  name: string
  type: string
}

export interface UMLMethod {
  id: string
  name: string
  returnType: string
  visibility: Visibility
  parameters: UMLParameter[]
}

export interface UMLClass {
  id: string
  name: string
  kind: ClassKind
  attributes: UMLAttribute[]
  methods: UMLMethod[]
  position: { x: number; y: number }
}

export interface UMLRelationship {
  id: string
  source: string
  target: string
  type: RelationshipType
  label?: string
}

export interface DiagramState {
  classes: UMLClass[]
  relationships: UMLRelationship[]
}

export const relationshipLabels: Record<RelationshipType, string> = {
  association: 'Association',
  aggregation: 'Aggregation',
  composition: 'Composition',
  inheritance: 'Inheritance',
  dependency: 'Dependency',
}
