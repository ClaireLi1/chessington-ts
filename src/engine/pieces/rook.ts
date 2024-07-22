import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const available_moves: Square[] = [];

        for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i != current_row){
                available_moves.push(new Square(i, current_col))
            }

            if (i != current_col){
                available_moves.push(new Square(current_row, i))
            }

        }

        return available_moves
    }
}
