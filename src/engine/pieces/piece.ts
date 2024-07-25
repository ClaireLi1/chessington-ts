import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import Pawn from './pawn'

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.resetEnPassantFlags(board);
    }

    protected isOnBoard(board_size: number, row: number, col: number): boolean {
        return (row >= 0 && row < board_size && col >= 0 && col < board_size);
    }

    protected resetEnPassantFlags(board: Board) {
        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
                const piece = board.getPiece(Square.at(row, col));
                if (piece instanceof Pawn) {
                    piece.enpassant_flag = false;
                }
            }
        }
    }
}
