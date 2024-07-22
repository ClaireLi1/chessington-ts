import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const available_moves: Square[] = [];

        const coords_sum: number = current_row + current_col;
        const coords_diff: number = current_row - current_col;

        const board_size:number = GameSettings.BOARD_SIZE

        for (let i = 0; i < board_size; i++) {
            if (i != current_row && coords_sum - i >= 0 && coords_sum - i < board_size){
                available_moves.push(new Square(i, coords_sum - i))
            }

            if (i != current_col && i + coords_diff >= 0 && i + coords_diff < board_size){
                available_moves.push(new Square(i + coords_diff, i))
            }
        }

        return available_moves
    }
}
