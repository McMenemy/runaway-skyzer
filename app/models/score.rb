class Score < ActiveRecord::Base
  validates :score, :username, :date, presence: true
  before_save :shorten_name, :no_swearing

  SWEAR_WORDS = [ "shit", "fuck", "bitch", "fag", "faggot",
    "pussy", "cunt", "nigger", "asshole" ]

  def self.todays_highscores
    Score.where(date: Date.today).order(score: :desc).limit(8).all
  end

  def self.alltime
    Score.order(score: :desc).first
  end

  private
  def shorten_name
    if self.username.length > 14
      self.username = self.username[0...14]
    end
  end

  def no_swearing
    name = self.username.downcase
    SWEAR_WORDS.each do |word|
      if name.include? word
        self.username = self.username.downcase.gsub word, ""

      end
    end
  end

end
