import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const available_moves: Square[] = [];

        const board_size:number = GameSettings.BOARD_SIZE

        const pos_list: number[][] = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];

        for (var position of pos_list) {
            var new_row: number = current_row + position[0]
            var new_col: number = current_col + position[1]
           
            if (this.isOnBoard(board_size, new_row, new_col)) {
                
                var new_square: Square = new Square(new_row, new_col)
                var piece: Piece | undefined = board.getPiece(new_square);

                if (!!piece) {
                    if (piece.player !== this.player && !(piece instanceof King)) {
                        available_moves.push(new_square);
                    }
                } else {
                    available_moves.push(new_square);
                }
            }

        }     
        return available_moves
    }

}
