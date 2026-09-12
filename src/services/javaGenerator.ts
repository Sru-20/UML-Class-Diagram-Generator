import type { DiagramState, UMLClass, UMLMethod } from '../types/uml'

const javaType = (type: string): string => type.trim() || 'void'
const methodSignature = (method: UMLMethod): string =>
  `${method.visibility === '+' ? 'public' : method.visibility === '-' ? 'private' : 'protected'} ${javaType(method.returnType)} ${method.name}(${method.parameters.map((parameter) => `${javaType(parameter.type)} ${parameter.name}`).join(', ')})`

const defaultReturn = (returnType: string): string => {
  if (returnType === 'void') return ''
  if (returnType === 'double' || returnType === 'float') return '        return 0.0;'
  if (returnType === 'long' || returnType === 'int' || returnType === 'short' || returnType === 'byte') return '        return 0;'
  if (returnType === 'boolean') return '        return false;'
  return '        return null;'
}

export const generateJavaClass = (umlClass: UMLClass): string => {
  const declaration = umlClass.kind === 'interface' ? `public interface ${umlClass.name}` : `public ${umlClass.kind === 'abstract' ? 'abstract ' : ''}class ${umlClass.name}`
  const fields = umlClass.kind === 'interface' ? [] : umlClass.attributes.map((attribute) => `    ${attribute.visibility === '+' ? 'public' : attribute.visibility === '#' ? 'protected' : 'private'} ${javaType(attribute.type)} ${attribute.name};`)
  const methods = umlClass.methods.flatMap((method) => [
    `    ${methodSignature(method)} {`,
    ...(umlClass.kind === 'interface' ? [] : [defaultReturn(javaType(method.returnType))].filter(Boolean)),
    '    }',
  ])
  return `${declaration} {\n${[...fields, fields.length && methods.length ? '' : '', ...methods].filter((line) => line !== '').join('\n')}\n}\n`
}

export const generateJavaFiles = (state: DiagramState): Record<string, string> =>
  Object.fromEntries(state.classes.map((umlClass) => [`${umlClass.name}.java`, generateJavaClass(umlClass)]))
