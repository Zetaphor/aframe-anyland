window.onload = function (e) {
  document.querySelector('#leftHand').addEventListener('pointingstart', function (e2) {
    e2.target.setAttribute('collision-filter', {collisionForces: true})
  })
  document.querySelector('#rightHand').addEventListener('pointingstart', function (e2) {
    e2.target.setAttribute('collision-filter', {collisionForces: true})
  })
  document.querySelector('#leftHand').addEventListener('pointingend', function (e2) {
    e2.target.setAttribute('collision-filter', {collisionForces: false})
  })
  document.querySelector('#rightHand').addEventListener('pointingend', function (e2) {
    e2.target.setAttribute('collision-filter', {collisionForces: false})
  })
}