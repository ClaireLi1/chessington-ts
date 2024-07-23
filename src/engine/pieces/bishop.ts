import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const available_moves: Square[] = [];

        const board_size:number = GameSettings.BOARD_SIZE


        const directions = [
            {row_move: -1, col_move: -1}, 
            {row_move: 1, col_move: 1}, 
            {row_move: 1, col_move: -1}, 
            {row_move: -1, col_move: 1} 
        ]

        for (var direction of directions) {
            let row = current_row + direction.row_move;
            let col = current_col + direction.col_move;

            while (this.isOnBoard(board_size, row, col)) {

                var new_square: Square = new Square(row, col)

                var piece: Piece | undefined = board.getPiece(new_square);

                if (!!piece) {
                    if (piece.player !== this.player && !(piece instanceof King)) {
                        available_moves.push(new_square);
                    }
                    break;
                }

                available_moves.push(new_square);

                row += direction.row_move
                col += direction.col_move
            }

        }

        return available_moves
    }
}
