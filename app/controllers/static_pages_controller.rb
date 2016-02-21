class StaticPagesController < ApplicationController
  def root
    @alltime = Score.alltime
    @highscores = Score.todays_highscores
    @games = Record.games
    @cheeses = Record.cheeses
  end
end
