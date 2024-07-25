import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';
import { Direction } from '../direction';

export default class Pawn extends Piece {
    enpassant_flag: boolean;

    public constructor(player: Player) {
        super(player);
        this.enpassant_flag = false;
    }

    // En passant is implemented in this program using an enpassant_flag being set to the pawns.
    // This flag is on if a pawn makes a two square move. This is turned off after the opponent's immediate move after this.
    // This moveTo overwrites the one in pieces because the logic is different to others. i.e. it allows enpassant_flag to be turned on and en passant move to be performed.
    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);

        if (Math.abs(newSquare.col - currentSquare.col) === 1 && board.getPiece(newSquare) === undefined) {  // This checks if an en passant move is being performed
            const capturedPawnSquare = new Square(currentSquare.row, newSquare.col); 
            const capturedPawn = board.getPiece(capturedPawnSquare);
            if (capturedPawn instanceof Pawn && capturedPawn.enpassant_flag == true) { // Make sure the enpassant move is permitted
                board.setPiece(capturedPawnSquare, undefined); // The square at which the captured pawn is is different to where the attacking Pawn is moving to. This removes the captured pawn from the board.
            }
        }

        super.moveTo(board, newSquare);

        if (Math.abs(newSquare.row - currentSquare.row) === 2) {
            this.enpassant_flag = true;
        }
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

        for (let i = 1; i <= max_dist; i++) {
            var new_row = current_row + i * row_move;
        
            var new_square: Square = new Square(new_row, current_col);

            if (!this.isOnBoard(board_size, new_row, current_col) || !!board.getPiece(new_square)) {
                break;
            }

            available_moves.push(new_square);

        }

        var directions: Direction[] = [{row_move : 1, col_move : 1}, 
                                        {row_move : 1, col_move : -1}];

        for (var direction of directions) {

            var new_row = current_row + row_move * direction.row_move;
            var new_col = current_col + direction.col_move;

            if (this.isOnBoard(board_size, new_row, new_col)) {
                var new_square: Square = new Square(new_row, new_col);
                var piece: Piece | undefined = board.getPiece(new_square);
                if (!!piece) {
                    if (piece.player !== this.player && !(piece instanceof King)) {
                        available_moves.push(new_square);
                    }
                } else {
                    const capturedPawnSquare = new Square(current_row, new_col);
                    const capturedPawn = board.getPiece(capturedPawnSquare);
                    if (capturedPawn instanceof Pawn && capturedPawn.enpassant_flag == true) {
                        available_moves.push(new_square);
                    }
                }                
            }
        }

        return available_moves;
    }

}
