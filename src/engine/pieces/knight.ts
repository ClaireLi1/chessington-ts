import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import { Direction } from '../direction';
import { getAvailableMovesKK } from './available_moves_helper';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const current_square: Square = board.findPiece(this);
        const current_row: number = current_square.row;
        const current_col: number = current_square.col;

        const board_size:number = GameSettings.BOARD_SIZE;

        const directions: Direction[] = [
            {row_move: 1, col_move: 2}, 
            {row_move: 1, col_move: -2}, 
            {row_move: -1, col_move: 2}, 
            {row_move: -1, col_move: -2},
            {row_move: 2, col_move: 1}, 
            {row_move: 2, col_move: -1}, 
            {row_move: -2, col_move: 1}, 
            {row_move: -2, col_move: -1}
        ]

        const available_moves: Square[] = getAvailableMovesKK(
            directions,
            current_row,
            current_col,
            this,
            board_size,
            board,
        );

        return available_moves;
    }

}
