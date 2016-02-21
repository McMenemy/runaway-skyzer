class Record < ActiveRecord::Base
  validates :name, :value, presence: true

  def self.games
    Record.where(name: 'games').first.value
  end

  def self.cheeses
    Record.where(name: 'cheeses').first.value
  end

  def self.add_game
    record = Record.where(name: 'games').first
    games = record.value
    games += 1
    record.update(value: games)
  end

  def self.add_cheeses(n)
    record = Record.where(name: 'cheeses').first
    cheeses = record.value
    cheeses += n
    record.update(value: cheeses)
  end

end
