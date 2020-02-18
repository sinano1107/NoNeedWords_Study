class DProcessings < ActiveRecord::Migration[5.2]
  def change
    drop_table : processings
  end
end
