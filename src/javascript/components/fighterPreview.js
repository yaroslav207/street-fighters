import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if(!fighter){
    return fighterElement
  }
  const image = createFighterImage(fighter)
  const info = createElement({tagName: 'ul', className: 'fighter-preview___info'})
  const infoItem = createInfoWrapper(fighter)
  info.append(...infoItem)
  fighterElement.append(image, info)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

function createInfoWrapper(fighter) {
  return Object.keys(fighter)
      .filter(key => key !== '_id' && key !== 'source')
      .map((key) => {
        const infoItem = createElement({tagName: 'li', className: 'fighter-preview___info-item'})
        infoItem.innerHTML = `${key}: ${fighter[key]}`
        return infoItem
      })
}
