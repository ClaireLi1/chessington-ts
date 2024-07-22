import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        return new Array(0);
    }
}
