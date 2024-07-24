import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from './king';

export default class Pawn extends Piece {
    enpassant_flag: boolean;

    public constructor(player: Player) {
        super(player);
        this.enpassant_flag = false;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);

        if (Math.abs(newSquare.col - currentSquare.col) === 1 && board.getPiece(newSquare) === undefined) {
            const capturedPawnSquare = new Square(currentSquare.row, newSquare.col);
            const capturedPawn = board.getPiece(capturedPawnSquare);
            if (capturedPawn instanceof Pawn && capturedPawn.enpassant_flag == true) {
                board.setPiece(capturedPawnSquare, undefined);
            }
        }

        board.movePiece(currentSquare, newSquare);

        this.resetEnPassantFlags(board);

        if (Math.abs(newSquare.row - currentSquare.row) === 2) {
            this.enpassant_flag = true;
        }
    }

    private resetEnPassantFlags(board: Board) {
        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
                const piece = board.getPiece(Square.at(row, col));
                if (piece instanceof Pawn) {
                    piece.enpassant_flag = false;
                }
            }
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

        var directions = [{row_move : 1, col_move : 1}, {row_move : 1, col_move : -1}];

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
