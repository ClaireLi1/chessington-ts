import 'chai/register-should';
import { assert } from "chai";
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import Rook from '../../src/engine/pieces/rook';

describe('Board', () => {

    describe('pawns', () => {

        let board : Board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            const piece = board.getPiece(square);
            pawn.should.equal(piece); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

        it('allow en passant move', () => {
            const whitePawn = new Pawn(Player.WHITE);
            const blackPawn = new Pawn(Player.BLACK);
            const whiteStart = Square.at(1, 4);
            const whiteEnd = Square.at(3, 4);
            const blackStart = Square.at(3, 3);
            const enPassantCaptureSquare = Square.at(2, 4);
            const whitePawnEndPosition = Square.at(3, 4);

            board.setPiece(whiteStart, whitePawn);
            board.setPiece(blackStart, blackPawn);

            whitePawn.moveTo(board, whiteEnd); 

            const moves = blackPawn.getAvailableMoves(board);

            moves.should.deep.include(enPassantCaptureSquare);

            if (moves.some(move => move.equals(enPassantCaptureSquare))) {
                blackPawn.moveTo(board, enPassantCaptureSquare);
            }
            
            const capturedBlackPawn = board.getPiece(enPassantCaptureSquare);
            assert.equal(capturedBlackPawn, blackPawn);

            const removedWhitePawn = board.getPiece(whitePawnEndPosition);
            assert.equal(removedWhitePawn, undefined);

        });

        it('Forbid en passant move otherwise', () => {
            const whitePawn = new Pawn(Player.WHITE);
            const blackPawn = new Pawn(Player.BLACK);
            const whiteRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(1, 4), whitePawn);
            board.setPiece(Square.at(4, 3), blackPawn);
            board.setPiece(Square.at(0, 0), whiteRook);

            whitePawn.moveTo(board, Square.at(3, 4)); 

            var moves = blackPawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 4));

            if (moves.some(move => move.equals(Square.at(3, 3)))) {
                blackPawn.moveTo(board, Square.at(3, 3));
            }

            moves = whiteRook.getAvailableMoves(board);

            if (moves.some(move => move.equals(Square.at(1, 0)))) {
                blackPawn.moveTo(board, Square.at(1, 0));
            }

            moves = blackPawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 4));
        });

    });
});
