const componentMaps = {
  position: ['x', 'y', 'z'],
  geometry: ['width', 'height', 'depth', 'primitive', 'radius', 'radius-bottom', 'radius-top'],
  scale: true,
  'body-merger': true,
  class: true,
  'collision-filter': true,
  'dynamic-body': true,
  'static-body': true,
  'static-grabbable': true,
  grabbable: false,
  material: true,
  sleepy: false,
  stretchable: false,
  hoverable: false,
  draggable: false
}

window.aFrameSerialize = function (entityId) {
  let entityJson = {
    root: {}
  }

  let entity = document.getElementById(entityId)
  entityJson.root = serializePrim(entity)
  if (entity.childNodes.length) {
    entityJson['children'] = []
    for (let index = 0; index < entity.childNodes.length; index++) {
      entityJson.children.push(serializePrim(entity.childNodes[index]))
    }
  }
  return entityJson
}

function serializePrim(entity) {
  let primJson = {}
  for (let index = 0; index < entity.attributes.length; index++) {
    if (typeof componentMaps[entity.attributes[index].name] !== 'undefined') {
      if (componentMaps[entity.attributes[index].name] === false) {
        primJson[entity.attributes[index].name] = ''
      } else if (componentMaps[entity.attributes[index].name] === true) {
        primJson[entity.attributes[index].name] = entity.getAttribute(entity.attributes[index].name) || ''
      } else {
        for (let keyIndex = 0; keyIndex < componentMaps[entity.attributes[index].name].length; keyIndex++) {
          if (typeof entity.getAttribute(entity.attributes[index].name) === 'undefined') continue
          if (typeof entity.getAttribute(entity.attributes[index].name)[componentMaps[entity.attributes[index].name][keyIndex]] === 'undefined') continue
          if (typeof primJson[entity.attributes[index].name] === 'undefined') primJson[entity.attributes[index].name] = {}
          primJson[entity.attributes[index].name][componentMaps[entity.attributes[index].name][keyIndex]] = entity.getAttribute(entity.attributes[index].name)[componentMaps[entity.attributes[index].name][keyIndex]]
        }
      }
    }
  }
  return primJson
}

window.aFrameDeserialize = function (objectJson) {
  let newObject = document.createElement('a-entity')
  newObject.setAttribute('id', 'obj-' + window.generateUid())
  newObject = deserializePrim(objectJson.root)
  for (let index = 0; index < objectJson.children.length; index++) {
    newObject.appendChild(deserializePrim(objectJson.children[index]))
  }
  window._elScene.appendChild(newObject)
  newObject.addEventListener('body-loaded', function () {
    newObject.body.updateBoundingRadius()
    newObject.body.updateMassProperties()
    newObject.body.wakeUp()
  })
  return newObject
}

function deserializePrim(primJson) {
  let newPrimId = 'prim-' + window.generateUid()
  let newPrim = document.createElement('a-entity')
  newPrim.setAttribute('id', newPrimId)
  for (const attribute in primJson) {
    newPrim.setAttribute(attribute, primJson[attribute])
  }
  return newPrim
}