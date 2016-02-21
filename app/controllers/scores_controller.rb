class ScoresController < ApplicationController

  def create
    Record.add_game
    Record.add_cheeses(params[:score][:score].to_i)
    @score = Score.new(score_params)
    @score.date = Date.today
    @score.save
    redirect_to "https://runawayskyzer.herokuapp.com"
  end

  private
  def score_params
    params.require(:score).permit(:username, :score)
  end
end
