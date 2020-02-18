class Word < ApplicationRecord
  validates :e, {presence: true}
  validates :j, {presence: true}
  validates :box, {presence: true}
end
