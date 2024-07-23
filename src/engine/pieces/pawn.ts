import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const board_size:number = GameSettings.BOARD_SIZE;

        var available_moves: Square[] = [];
        const startRow = this.player === Player.WHITE ? 1 : board_size - 2;
        const row_move = this.player === Player.WHITE ? 1 : -1;
        const max_dist = current_row === startRow ? 2 : 1;


        // Forward moves
        for (let i = 1; i <= max_dist; i++) {
            var new_row = current_row + i * row_move;
        
            var new_square: Square = new Square(new_row, current_col);

            if (!this.isOnBoard(board_size, new_row, current_col) || !!board.getPiece(new_square)) {
                break;
            }

            available_moves.push(new_square);

        }


        // Diagonal moves
        const directions = [{row_move : 1, col_move : 1}, {row_move : 1, col_move : -1}]

        for (var direction of directions) {

            var new_row = current_row + row_move * direction.row_move;
            var new_col = current_col + direction.col_move

            if (this.isOnBoard(board_size, new_row, new_col)) {
                var new_square: Square = new Square(new_row, new_col);
                var piece: Piece | undefined = board.getPiece(new_square);
                if (!!piece) {
                    if (piece.player !== this.player && !(piece instanceof King)) {
                        available_moves.push(new_square);
                    }
                }                
            }
        }

        return available_moves;
    }

}
