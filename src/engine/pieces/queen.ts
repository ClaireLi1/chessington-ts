import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Queen extends Piece {
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
            {row_move: -1, col_move: 0}, 
            {row_move: 1, col_move: 0},
            {row_move: 0, col_move: 1},
            {row_move: 0, col_move: -1},
            {row_move: -1, col_move: -1}, 
            {row_move: 1, col_move: 1}, 
            {row_move: 1, col_move: -1}, 
            {row_move: -1, col_move: 1}
        ]

        for (var direction of directions){
            let row = current_row + direction.row_move;
            let col = current_col + direction.col_move;

            while (this.isOnBoard(board_size, row, col)){

                var new_square: Square = new Square(row, col)

                available_moves.push(new_square)

                if (!!board.getPiece(new_square)){
                    break;
                }

                row += direction.row_move
                col += direction.col_move
            }

        }

        return available_moves
    }

    private isOnBoard(board_size: number, row: number, col: number){
        return (row >= 0 && row < board_size && col >= 0 && col < board_size);
    }
}
