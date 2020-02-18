class MoveController < ApplicationController
  def index
  end

  def make_card
    @error_text = []
    @word = Word.new
  end

  def study_menu
    @error_text = nil
  end

  def list
  end

  def test
  end

  def election
    @error_text = nil
    @box = params[:box]
    @questions = ""
    @count = params[:count]
    array = nil
    if @box == "All"
      array = Word.all
    else
      array = Word.where(box: @box)
    end
    array.each do |i|
      @questions = @questions + i.id.to_s + "," + i.e + "," + i.j + "/"
    end
    @questions = @questions.chop

    if params[:error] == "true"
      @error_text = "error: Please select #{@count} problems"
    end
  end

  def study
    next_list = {"j->e/say" => "j->e/write", "j->e/write" => "e->j/say", "e->j/say" => "e->j/write", "e->j/write" => ""}
    @language = params[:language].to_s
    @format = params[:format].to_s
    @questions = params[:questions]
    random = []
    @test = nil
    array = @questions.split(",")

    list = array.map {|i| data=Word.find_by(id: i)
                          data.e + "," + data.j}
    @questions_array = list.join("/")

    random = array.shuffle

    @next_btn_href = "/move/study/#{random.join(",")}/" + next_list["#{@language}/#{@format}"]
    @again_btn_href = "/move/study/#{random.join(",")}/#{@language}/#{@format}"
  end

end
