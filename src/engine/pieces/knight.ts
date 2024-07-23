import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

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
            
            if (new_row >= 0 && new_row < board_size && new_col >= 0 && new_col < board_size) {
                available_moves.push(new Square(new_row, new_col))
            }

        }

        
        return available_moves
    }
}
