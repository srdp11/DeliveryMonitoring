class MainController < ApplicationController
  def index
    @operator_records = Record.all
  end
end
