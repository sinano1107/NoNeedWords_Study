class ProcessingController < ApplicationController
  def make_card
    @word = Word.new(e: params[:e], j: params[:j], box: "Unlearned")
    if @word.save
      @js_toasts = "true"
      if params[:repeat]
        @error_text = []
        @word = Word.new()
        render("move/make_card")
      else
        render("move/index")
      end
    else
      @error_text = []
      @word.errors.full_messages.each do |message|
        if message == "E can't be blank"
          @error_text.push("Please enter English words")
        else
          @error_text.push("Please enter Japanese translation")
        end
      end
      @js_toasts = "false"
      render("move/make_card")
    end
  end

  def study_preparation
    @questions = []
    possession = nil
    if params[:box] != "All"
      possession = Word.where(box: params[:box]).map {|x| x.id}
    else
      possession = Word.pluck(:id)
    end
    #所持カード枚数 <= 指定問題カード数 の確認
    if possession.count < params[:questions].to_i
      @error_text = "The number of cards is insufficient"
      render("move/study_menu")
    else
      #rondom変数を確認し自選ページにredirectさせる
      if params[:random]
        #乱数問題選択開始！！
        limit = possession.count - 1
        params[:questions].to_i.times do
          num = rand(0..limit)
          limit -= 1
          @questions.push(possession[num])
          possession.delete_at(num)
        end
        redirect_to("/move/study/#{@questions.join(",")}/j->e/say")
      else
        redirect_to("/move/election/#{params[:questions]}/#{params[:box]}/false")
      end
    end



  end

  def election_processing
    #まずチェックされている要素の配列を作る
    count = params[:count].to_i
    box = params[:box]
    id = []
    questions = []
    array = []

    #変数下拵え開始
    logger.debug(box)
    if box == "All"
      Word.all.each do |i|
        id.push(i.id)
      end
    else
      Word.where(box: box).each do |i|
        id.push(i.id)
      end
    end

    id.each do |id|
      if params[:"check_#{id}"] == "true"
        array.push(id)
      end
    end
    #終わり

    #問題配列の並び替え開始
    questions = array.shuffle
    logger.debug("デバッグ" + questions.to_s)
    logger.debug("デバッグ" + params[:"check_1"].to_s)
    #処理開始
    if questions.length == count
      redirect_to("/move/study/#{questions.join(",")}/j->e/say")
    else
      redirect_to("/move/election/#{count}/#{box}/true")
    end
  end

  def finishing
    params[:questions].split(",").each do |id|
      data = Word.find_by(id: id)
      data.box = "Learned"
      data.save
    end

    redirect_to("/")
  end

end
