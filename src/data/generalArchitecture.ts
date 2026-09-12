import type { DiagramState, UMLAttribute, UMLMethod } from '../types/uml'

const attribute = (id: string, name: string, type: string, visibility: UMLAttribute['visibility'] = '-'): UMLAttribute => ({ id, name, type, visibility })
const method = (id: string, name: string, returnType: string, parameters: UMLMethod['parameters'] = []): UMLMethod => ({ id, name, returnType, visibility: '+', parameters })

export const generalArchitecture: DiagramState = {
  classes: [
    {
      id: 'general-controller', name: 'ApplicationController', kind: 'class', position: { x: 75, y: 90 },
      attributes: [attribute('controller-service', 'service', 'ApplicationService'), attribute('controller-route', 'baseRoute', 'String')],
      methods: [method('controller-handle', 'handleRequest', 'Response'), method('controller-health', 'healthCheck', 'boolean')],
    },
    {
      id: 'general-service', name: 'ApplicationService', kind: 'class', position: { x: 475, y: 90 },
      attributes: [attribute('service-repository', 'repository', 'Repository'), attribute('service-notifier', 'notifier', 'Notifier')],
      methods: [method('service-create', 'create', 'Entity'), method('service-find', 'findById', 'Entity'), method('service-delete', 'delete', 'void')],
    },
    {
      id: 'general-repository', name: 'Repository', kind: 'interface', position: { x: 885, y: 90 },
      attributes: [],
      methods: [method('repository-save', 'save', 'Entity'), method('repository-find', 'findById', 'Entity'), method('repository-remove', 'remove', 'void')],
    },
    {
      id: 'general-entity', name: 'Entity', kind: 'abstract', position: { x: 265, y: 420 },
      attributes: [attribute('entity-id', 'id', 'String'), attribute('entity-created', 'createdAt', 'Date'), attribute('entity-updated', 'updatedAt', 'Date')],
      methods: [method('entity-validate', 'validate', 'boolean'), method('entity-to-map', 'toMap', 'Map')],
    },
    {
      id: 'general-database', name: 'Database', kind: 'class', position: { x: 700, y: 420 },
      attributes: [attribute('database-url', 'connectionUrl', 'String'), attribute('database-pool', 'poolSize', 'int')],
      methods: [method('database-connect', 'connect', 'void'), method('database-query', 'query', 'List'), method('database-close', 'close', 'void')],
    },
    {
      id: 'general-notifier', name: 'Notifier', kind: 'interface', position: { x: 1030, y: 420 },
      attributes: [],
      methods: [method('notifier-send', 'send', 'void'), method('notifier-ready', 'isReady', 'boolean')],
    },
  ],
  relationships: [
    { id: 'general-controller-service', source: 'general-controller', target: 'general-service', type: 'dependency' },
    { id: 'general-service-repository', source: 'general-service', target: 'general-repository', type: 'association' },
    { id: 'general-service-notifier', source: 'general-service', target: 'general-notifier', type: 'association' },
    { id: 'general-repository-database', source: 'general-repository', target: 'general-database', type: 'dependency' },
    { id: 'general-service-entity', source: 'general-service', target: 'general-entity', type: 'aggregation' },
    { id: 'general-database-entity', source: 'general-database', target: 'general-entity', type: 'composition' },
  ],
}
