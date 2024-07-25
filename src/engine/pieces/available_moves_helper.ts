import { Direction } from '../direction';
import Piece from './piece';
import King from './king';
import Player from '../player';
import Board from '../board';
import Square from '../square';


export function getAvailableMovesInDirections(
    directions: Direction[],
    current_row: number,
    current_col: number,
    piece_obj: Piece,
    board_size: number,
    board: Board,

) {
    const available_moves: Square[] = [];
    
    for (var direction of directions) {
        let row = current_row + direction.row_move;
        let col = current_col + direction.col_move;

        while (piece_obj.isOnBoard(board_size, row, col)) {

            var new_square: Square = new Square(row, col);

            var piece: Piece | undefined = board.getPiece(new_square);

            if (!!piece) {
                if (piece.player !== piece_obj.player && !(piece instanceof King)) {
                    available_moves.push(new_square);
                }
                break;
            }

            available_moves.push(new_square);

            row += direction.row_move;
            col += direction.col_move;
        }

    }

    return available_moves;
}