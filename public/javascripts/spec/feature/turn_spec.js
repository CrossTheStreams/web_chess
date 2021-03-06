describe("Chess Game",function(){

  describe("Moves", function() {

    beforeEach(function(){
      jasmine.Ajax.install();
    });

    afterEach(function(){
      webChess.board = new ChessBoardView;
      webChess.engine = new Chess();
      jasmine.Ajax.uninstall(); 
    });

    describe("On the first turn", function(){

      it("a new game", function() {
        expect(webChess.board.moves.length).toBe(0);
      });

      it("has a the FEN string for a starting chess board.", function(){
        expect(webChess.board.currentPosition()).toEqual(webChess.startFen);
      });

    });

    describe("making a valid move", function(){
      var move = {from: 'e2', to: 'e4'},
      ajaxPath = '/game/1/moves',
      callback = jasmine.createSpy('callback');

      beforeEach(function() {
        spyOn($,'ajax');
        jasmine.Ajax.stubRequest(ajaxPath).andReturn({
          status: 200,
          contentType: 'text/plain',
          responseText: 'awesome response' 
        });
        webChess.board.attemptMove(move);
      });

      it("adds a move object to the game", function(){
        expect(webChess.board.moves.length).toBe(1);
      });

      it("changes the FEN string",function(){
        expect(webChess.board.currentPosition()).not.toEqual(webChess.startFen);
      });

      it("makes a request to create a new move",function() {
        var postRequest = jasmine.objectContaining({
          type: 'POST',
          url: '/games/1/moves',
          data: '{"move":{"from":"e2","to":"e4"},"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"}' 
        });
        expect($.ajax).toHaveBeenCalledWith(postRequest);
      });

    });

  });

});

