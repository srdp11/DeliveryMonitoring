class MainController < ApplicationController
  def index
    @records = Record.all
  end
end
