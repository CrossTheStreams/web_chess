module WebChess
  module Views

    class Home

      class Index
        include WebChess::View
        layout :application


        def omg
          ["o","m","g"]
        end

      end

    end
  end
end

