const componentMaps = {
  position: ['x', 'y', 'z'],
  class: true,
  'collision-filter': true,
  'dynamic-body': true,
  geometry: ['width', 'height', 'depth', 'primitive'],
  grabbable: false,
  material: true,
  scale: true,
  sleepy: false,
  stretchable: false,
  hoverable: false
}

window.aFrameSerialize = function (entityId) {
  let entityJson = {
    root: {}
  }

  let entity = document.querySelector('#' + entityId)
  // entityJson.root = serializePrim(entity)
  if (entity.childNodes.length) {
    entityJson['children'] = []
    for (let index = 0; index < entity.childNodes.length; index++) {
      entityJson.children.push(serializePrim(entity.childNodes[index]))
    }
  }
  console.log(entityJson)
}

function serializePrim(entity) {
  let primJson = {}
  for (let index = 0; index < entity.attributes.length; index++) {
    if (typeof componentMaps[entity.attributes[index].name] !== 'undefined') {
      if (componentMaps[entity.attributes[index].name] === false) {
        primJson[entity.attributes[index].name] = ''
      } else if (componentMaps[entity.attributes[index].name] === true) {
        primJson[entity.attributes[index].name] = entity.getAttribute(entity.attributes[index].name)
      } else {
        for (let keyIndex = 0; keyIndex < componentMaps[entity.attributes[index].name].length; keyIndex++) {
          primJson[componentMaps[entity.attributes[index].name][keyIndex]] = entity.getAttribute(entity.attributes[index].name)[componentMaps[entity.attributes[index].name][keyIndex]]
        }
      }
    }
  }
  return primJson
}

window.aFrameDeserialize = function (objectJson) {

}