import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const available_moves: Square[] = [];

        if (this.player === Player.WHITE){
            available_moves.push(new Square(current_row + 1, current_col));
        }else{
            available_moves.push(new Square(current_row - 1, current_col));
        }

        console.log(available_moves);
        return available_moves

    }
}
