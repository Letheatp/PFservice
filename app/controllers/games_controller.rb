class GamesController < ApplicationController
  def index
    games = current_user.available_games

    game_titles_with_index = games.map.with_index do |game, index|
      { title: game.title, index: index }
    end

    if request.xhr?
      respond_to do |format|
        format.json do
          render json: game_titles_with_index
        end
      end
    end
  end
end