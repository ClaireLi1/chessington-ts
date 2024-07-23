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

        if (this.player === Player.WHITE){
            available_moves.push(new Square(current_row + 1, current_col));
        }else{
            available_moves.push(new Square(current_row - 1, current_col));
        }

        if (current_row === 1 && this.player === Player.WHITE) {
            if (!board.getPiece(new Square(current_row + 1, current_col))) {
                available_moves.push(new Square(current_row + 2, current_col));
            }
        }
        
        if (current_row === board_size - 2 && this.player === Player.BLACK){
            if (!board.getPiece(new Square(current_row - 1, current_col))) {
                available_moves.push(new Square(current_row - 2, current_col));
            }
        }


        let condition = (item: Square) => !board.getPiece(item) == true

        available_moves = available_moves.filter(item => condition(item))

        return available_moves
    }
}
