import {showModal} from "./modal";
import {createElement} from "../../helpers/domHelper";
import winnerImage from "../../../../resources/winner.png";
import {createFighterImage} from "../fighterPreview";
import App from '../../../../src/javascript/app';

export function showWinnerModal(fighter) {
    const winnerWrapper = createElement({ tagName: 'div', className: 'winner___root'});
    const winnerImageWrapper = createElement({tagName: 'img', className: `winner___img`, attributes: {src: winnerImage}});
    const imgElement = createFighterImage(fighter);
    const fighterElement = createElement({tagName: 'div', className: `winner___winner-wrapper`});

    fighterElement.append(winnerImageWrapper, imgElement);
    winnerWrapper.append(fighterElement);

    return showModal({title: fighter.name + ' win', bodyElement: winnerWrapper, onClose: restartGame});
}

function restartGame(){
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = ''

    new App()
}
