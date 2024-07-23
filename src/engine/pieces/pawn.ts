import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

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

        const row_move = 1
        
        var max_dist: number = 1

        if ((this.player === Player.WHITE && current_row === 1) || (this.player === Player.BLACK && current_row === board_size - 2)) {
            max_dist = 2
        }


        let row = current_row;
        let col = current_col;

        for (let i = 1; i <= max_dist; i++) {

            if (this.player === Player.WHITE) {
                row += row_move
            } else {
                row -= row_move
            }
            

            var new_square: Square = new Square(row, col)

            if (!this.isOnBoard(board_size, row, col) || !!board.getPiece(new_square)) {
                break
            }

            available_moves.push(new_square)

        }

        return available_moves
    }

}
